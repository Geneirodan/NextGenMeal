using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services.Models;
using Services.Models.Users;
using System.Linq.Expressions;
using System.Security.Claims;
using Utils.Constants;

namespace Services.CRUD
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationContext context;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;
        public OrderService(ApplicationContext context, UserManager<User> userManager, IConfiguration configuration)
        {
            this.context = context;
            this.userManager = userManager;
            this.configuration = configuration;
        }

        public async Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page)
        {
            var user = await userManager.GetUserAsync(principal);
            Expression<Func<Order, bool>> predicate = user switch
            {
                Employee employee => x => x.CateringId == employee.CateringId,
                null => throw new NullReferenceException(),
                _ => x => x.CustomerId == user.Id,
            };
            var query = context.Set<Order>().Where(predicate).OrderByDescending(x => x.Time);
            var entities = await query.Skip((page - 1) * Utils.ItemsPerPage).Take(Utils.ItemsPerPage).ToListAsync();
            var models = entities.Adapt<List<OrderModel>>();
            return new PagedArrayModel<OrderModel>(models, query.Count());
        }

        public async Task<Result<OrderModel>> AddAsync(ClaimsPrincipal principal, OrderModel model)
        {
            using var transaction = context.Database.BeginTransaction();
            var b = model.OrderDishes.All(od => context.Set<Dish>().Any(d => d.Id == od.DishId));
            if (!b)
                return Result.Fail(Errors.InvalidDishes);
            var entity = model.Adapt<Order>();
            entity.CustomerId = userManager.GetUserId(principal)!;
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
            proxy.Price = orderDishes.Sum(od => od.Quantity * od.Dish.Price);
            context.Update(proxy);
            await context.SaveChangesAsync();
            transaction.Commit();
            var response = proxy.Adapt<OrderModel>();
            return Result.Ok(response);
        }

        public async Task<Result> DeleteAsync(ClaimsPrincipal principal, int id)
        {
            var order = await context.FindAsync<Order>(id);
            if (order is null)
                return Result.Fail(Errors.NotFound);
            var user = await userManager.GetUserAsync(principal);
            if (order.GetOwnerId() != user!.Id)
                return Result.Fail(Errors.Forbidden);
            if (user is Customer)
            {
                var timeoutMins = double.Parse(configuration["Order:DeleteTimeout"]!);
                var timeout = TimeSpan.FromMinutes(timeoutMins);
                if (order.Time - timeout < DateTime.UtcNow)
                        return Result.Fail(Errors.Forbidden);
                }
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
                    return Result.Fail(Errors.NotFound);
                return invariant.Select(i =>
                {
                    Dish dish = i.Dishes.First();
                    return new OrderDishModel { OrderId = 0, DishId = dish.Id, Dish = dish.Adapt<DishModel>(), Quantity = i.Type.Value };
                }).ToList();
            }
            catch (InvalidOperationException)
            {
                return Result.Fail(Errors.NotFound);
            }
        }
        internal record TagDish(KeyValuePair<string, int> Type)
        {
            public IOrderedQueryable<Dish> Dishes { get; set; } = null!;
        }

        public async Task<PagedArrayModel<ServiceModel>> GetServicesAsync(int page, string query, string? country)
        {
            var enumerable = context.Set<Service>().Where(x => x.Name.Contains(query));
            if (country is not null)
                enumerable = enumerable.Where(x => x.Country == country);
            var entities = await enumerable.OrderByDescending(x => x.Name).Skip((page - 1) * Utils.ItemsPerPage).Take(Utils.ItemsPerPage).ToListAsync();
            var models = entities.Adapt<List<ServiceModel>>();
            return new PagedArrayModel<ServiceModel>(models, enumerable.Count());
        }

        public async Task<Result> PayAsync(ClaimsPrincipal principal, int id) => 
            await SetStatus(principal, id, OrderStatuses.Undone, OrderStatuses.Paid);

        public async Task<Result> DoAsync(ClaimsPrincipal principal, int id) => 
            await SetStatus(principal, id, OrderStatuses.Paid, OrderStatuses.Done);

        public async Task<Result> ReceiveAsync(ClaimsPrincipal principal, int id) => 
            await SetStatus(principal, id, OrderStatuses.Done, OrderStatuses.Received);

        private async Task<Result> SetStatus(ClaimsPrincipal principal, int id, string oldStatus, string newStatus)
        {
            var order = await context.FindAsync<Order>(id);
            if (order is null)
                return Result.Fail(Errors.NotFound);
            var userId = userManager.GetUserId(principal);
            if (order.GetOwnerId() != userId || order.Status != oldStatus)
                return Result.Fail(Errors.Forbidden);
            order.Status = newStatus;
            context.Update(order);
            await context.SaveChangesAsync();
            return Result.Ok();
        }
    }
}
