﻿using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using Services.Models;
using System.Linq;
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
            var entities = await query.Skip(page * Utils.ItemsPerPage).Take(Utils.ItemsPerPage).ToListAsync();
            var models = entities.Adapt<List<OrderModel>>();
            return new PagedArrayModel<OrderModel>(models, query.Count());
        }

        public async Task<Result<OrderModel>> AddAsync(OrderModel model)
        {
            model.Status = "Undone";
            var entity = model.Adapt<Order>();
            await context.AddAsync(entity);
            entity.Price = entity.OrderDishes.Sum(od => od.Quantity * od.Dish.Price);
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
            if(user is Customer)
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
    }
}
