using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Services.Interfaces;
using Services.Interfaces.CRUD;
using Services.Models;
using Services.Models.Users;
using System.Linq.Expressions;
using System.Security.Claims;
using Utils.Constants;
using static Services.CRUD.OrderService;

namespace Services.CRUD
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationContext context;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;
        private readonly ILogger<OrderService> logger;
        public OrderService(ApplicationContext context,
                            UserManager<User> userManager,
                            IConfiguration configuration,
                            ILogger<OrderService> logger)
        {
            this.context = context;
            this.userManager = userManager;
            this.configuration = configuration;
            this.logger = logger;
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
            var entities = await query.Skip(page * Utils.ItemsPerPage).Take(Utils.ItemsPerPage).ToListAsync();
            var models = entities.Adapt<List<OrderModel>>();
            return new PagedArrayModel<OrderModel>(models, query.Count());
        }

        public async Task<Result<OrderModel>> AddAsync(OrderModel model)
        {
            model.Status = "Undone";
            var entity = model.Adapt<Order>();
            await context.AddAsync(entity);
            try
            {
                entity.Price = entity.OrderDishes.Sum(od => od.Quantity * od.Dish.Price);
            }
            catch
            {
                return Result.Fail("Invalid dishes");
            }
            //context.Update(entity);
            await context.SaveChangesAsync();
            var response = entity.Adapt<OrderModel>();
            return Result.Ok(response);
        }

        public async Task<Result> DeleteAsync(ClaimsPrincipal principal, int id)
        {
            var order = await context.FindAsync<Order>(id);
            if (order is null)
                return Result.Fail(Errors.NotFound);
            var user = await userManager.GetUserAsync(principal);
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
                logger.LogInformation("First Filtering");
                foreach (var type in types)
                {
                    var tagDish = new TagDish(type)
                    {
                        Dishes = context.Dishes.Where(d => d.CateringId == cateringId)
                                               .Where(d => d.Type == type.Key)
                                               .OrderByDescending(d => d.Price)
                    };
                    tagDishes.Add(tagDish);
                    logger.LogInformation("Type: {type}, Dish: {dish}", type, JsonConvert.SerializeObject(tagDish.Dishes.First().Adapt<DishModel>()));
                }
                logger.LogInformation("Second Filtering");
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
                    logger.LogInformation("Type: {type}, Dish: {dish}", first.Type, JsonConvert.SerializeObject(first.Dishes.First().Adapt<DishModel>()));
                }
                invariant.AddRange(tagDishes);
                if (maxPrice < 0)
                    return Result.Fail(Errors.NotFound);
                string goalFunction = "";
                foreach(var variant in invariant)
                    goalFunction += $" + {variant.Dishes.First().Price} x {variant.Type.Value}";
                goalFunction = $"{goalFunction[3..]} = {invariant.Sum(GoalFunc)}";
                logger.LogInformation("Goal Function: {func}", goalFunction);
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
    }
}
