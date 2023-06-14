using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MQTTnet;
using MQTTnet.Client;
using Services.Interfaces;
using Services.Models;
using Services.Models.Users;
using System.Linq.Expressions;
using System.Security.Claims;
using Utils.Constants;

namespace Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationContext context;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;
        private readonly IMqttClient client;
        public OrderService(ApplicationContext context, UserManager<User> userManager, IConfiguration configuration, IMqttClient client)
        {
            this.context = context;
            this.userManager = userManager;
            this.configuration = configuration;
            this.client = client;
        }

        public async Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal,
                                                                int page,
                                                                bool? isBox,
                                                                DateTime startTime,
                                                                DateTime endTime,
                                                                string? status)
        {
            var user = await userManager.GetUserAsync(principal);
            Expression<Func<Order, bool>> predicate = user switch
            {
                Employee employee => x => x.CateringId == employee.CateringId,
                null => throw new NullReferenceException(),
                _ => x => x.CustomerId == user.Id,
            };
            var query = context.Set<Order>()
                               .Where(o => o.Time <= endTime
                                           && o.Time >= startTime)
                               .Where(predicate);
            if (isBox is not null)
                query = query.Where(x => x.IsBox == isBox);
            if (status is not null)
                query = query.Where(x => x.Status == status);
            var entities = await query.OrderByDescending(x => x.Time)
                                      .Skip((page - 1) * Utils.ItemsPerPage)
                                      .Take(Utils.ItemsPerPage)
                                      .ToListAsync();
            var models = entities.Adapt<List<OrderModel>>();
            return new PagedArrayModel<OrderModel>(models, query.Count());
        }

        public async Task<Result<OrderModel>> AddAsync(ClaimsPrincipal principal, OrderModel model)
        {
            await using var transaction = await context.Database.BeginTransactionAsync();
            model.Status = OrderStatuses.Undone;
            var b = model.OrderDishes.All(od => context.Set<Dish>().Any(d => d.Id == od.DishId));
            if (!b)
                return Result.Fail(Errors.INVALID_DISHES);
            var entity = model.Adapt<Order>();
            var user = await userManager.GetUserAsync(principal);
            switch (user)
            {
                case Customer:
                    entity.CustomerId = user.Id;
                    break;
                case Employee employee:
                    entity.CateringId = employee.CateringId;
                    break;
                default:
                    throw new ArgumentException(string.Empty, nameof(principal));

            }
            var proxy = context.Set<Order>().CreateProxy();
            context.Entry(proxy).CurrentValues.SetValues(entity);
            await context.AddAsync(proxy);
            await context.SaveChangesAsync();
            var orderDishes = model.OrderDishes.Adapt<List<OrderDish>>();
            orderDishes.ForEach(od =>
            {
                od.OrderId = proxy.Id;
                var dish = context.Set<Dish>().Find(od.DishId);
                od.Dish = dish!;
            });
            await context.AddRangeAsync(orderDishes);
            if (proxy.IsBox)
            {
                var terminal = proxy.Catering!.Terminal;
                var index = Array.IndexOf(terminal.Cells, string.Empty);
                if (index == -1)
                    return Result.Fail("No cells available");
                terminal.Cells[index] = proxy.Id.ToString();
                context.Update(terminal);
            }
            proxy.Price = orderDishes.Sum(od => od.Quantity * od.Dish.Price);
            context.Update(proxy);
            await context.SaveChangesAsync();
            await transaction.CommitAsync();
            var response = proxy.Adapt<OrderModel>();
            return Result.Ok(response);
        }

        public async Task<Result> DeleteAsync(ClaimsPrincipal principal, int id)
        {
            var order = await context.FindAsync<Order>(id);
            if (order is null)
                return Result.Fail(Errors.NOT_FOUND);
            var user = await userManager.GetUserAsync(principal);
            if (order.GetOwnerId() != user!.Id)
                return Result.Fail(Errors.FORBIDDEN);
            if (user is Customer)
            {
                var timeoutMins = double.Parse(configuration["Order:DeleteTimeout"]!);
                var timeout = TimeSpan.FromMinutes(timeoutMins);
                if (order.Time - timeout < DateTime.UtcNow)
                    return Result.Fail(Errors.FORBIDDEN);
            }
            if (order.IsBox)
                RemoveFromCell(order);
            context.Remove(order);
            await context.SaveChangesAsync();
            return Result.Ok();
        }

        public Result<List<OrderDishModel>> GetOptimal(int cateringId, decimal maxPrice, Dictionary<string, int> types)
        {
            try
            {
                static decimal GoalFunc(TagDish td) => td.Dishes.First().Price * td.Type.Value;
                List<TagDish> tagDishes = new();
                List<TagDish> invariant = new();
                foreach (var type in types)
                {
                    var tagDish = new TagDish(type)
                    {
                        Dishes = context.Dishes.Where(d => d.CateringId == cateringId)
                                               .Where(d => d.Type == type.Key)
                                               .OrderByDescending(d => d.Price)
                    };
                    tagDishes.Add(tagDish);
                }
                while (tagDishes.Sum(GoalFunc) > maxPrice)
                {
                    tagDishes = tagDishes.OrderByDescending(GoalFunc).ToList();
                    var first = tagDishes.First();
                    if (first.Dishes.Count() == 1)
                    {
                        invariant.Add(first);
                        maxPrice -= GoalFunc(first);
                        tagDishes.RemoveAt(0);
                    }
                    else
                        first.Dishes = first.Dishes.Skip(1).OrderByDescending(d => d.Price);
                }
                invariant.AddRange(tagDishes);
                if (maxPrice < 0)
                    return Result.Fail(Errors.NOT_FOUND);
                return invariant.Select(i =>
                {
                    Dish dish = i.Dishes.First();
                    return new OrderDishModel { OrderId = 0, DishId = dish.Id, Dish = dish.Adapt<DishModel>(), Quantity = i.Type.Value };
                }).ToList();
            }
            catch (InvalidOperationException)
            {
                return Result.Fail(Errors.NOT_FOUND);
            }
        }

        private record TagDish(KeyValuePair<string, int> Type)
        {
            public IOrderedQueryable<Dish> Dishes { get; set; } = null!;
        }

        public async Task<PagedArrayModel<ServiceModel>> GetServicesAsync(int page, string query, string? country)
        {
            var enumerable = context.Set<Service>()
                                    .Where(x => x.LockoutEnd == null)
                                    .Where(x => x.Name.Contains(query) || x.Country.Contains(query));
            if (country is not null)
                enumerable = enumerable.Where(x => x.Country == country);
            var entities = await enumerable.OrderByDescending(x => x.Name)
                                           .Skip((page - 1) * Utils.ItemsPerPage)
                                           .Take(Utils.ItemsPerPage)
                                           .ToListAsync();
            var models = entities.Adapt<List<ServiceModel>>();
            return new PagedArrayModel<ServiceModel>(models, enumerable.Count());
        }

        public async Task<Result> DoAsync(ClaimsPrincipal principal, int id) =>
            await SetStatus(id, OrderStatuses.Undone, OrderStatuses.Done);

        public async Task<Result> ReceiveAsync(ClaimsPrincipal principal, int id) =>
            await SetStatus(id, OrderStatuses.Done, OrderStatuses.Received);

        private async Task<Result> SetStatus(int id, string oldStatus, string newStatus)
        {
            var order = await context.FindAsync<Order>(id);
            if (order is null)
                return Result.Fail(Errors.NOT_FOUND);
            if (order.Status != oldStatus)
                return Result.Fail(Errors.FORBIDDEN);
            if (order.IsBox && newStatus == OrderStatuses.Received)
            {
                var terminal = order.Catering!.Terminal;
                var cellId = Array.IndexOf(terminal.Cells, order.Id.ToString());
                var prefix = configuration["Mqtt:Prefix"];
                var message = new MqttApplicationMessageBuilder()
                .WithTopic($"{prefix}/{terminal.SerialNumber}")
                .WithPayload(cellId.ToString())
                .Build();
                await client.PublishAsync(message);
                RemoveFromCell(order);
            }
            order.Status = newStatus;
            context.Update(order);
            await context.SaveChangesAsync();
            return Result.Ok();
        }

        private void RemoveFromCell(Order order)
        {
            var terminal = order.Catering!.Terminal;
            var index = Array.IndexOf(terminal.Cells, order.Id.ToString());
            terminal.Cells[index] = string.Empty;
            context.Update(terminal);
        }

        public async Task<OrderModel?> GetOrderById(int id)
        {
            var order = await context.Orders.FindAsync(id);
            return order?.Adapt<OrderModel>();
        }
    }
}
