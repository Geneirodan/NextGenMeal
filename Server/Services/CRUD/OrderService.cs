using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces.CRUD;
using Services.Models;
using Settings.Constants;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Services.CRUD
{
    public class OrderService : CrudService<OrderModel, Order>, IOrderService
    {
        private readonly UserManager<User> userManager;
        public OrderService(ApplicationContext context, UserManager<User> userManager) : base(context) => this.userManager = userManager;

        public async Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page = 1)
        {
            var user = await userManager.GetUserAsync(principal);
            Expression<Func<Order, bool>> predicate = user switch
            {
                Employee employee => x => x.CateringId == employee.CateringId,
                null => throw new NullReferenceException(),
                _ => x => x.CustomerId == user.Id,
            };
            return await base.GetAsync(page, predicate, x => x.Time);
        }

        public override async Task<Result<OrderModel>> AddAsync(OrderModel model)
        {
            model.Status = "Undone";
            var entity = model.Adapt<Order>();
            await context.AddAsync(entity);
            entity.Price = entity.OrderDishes.Sum(od => od.Quantity * od.Dish.Price);
            context.Update(entity);
            await context.SaveChangesAsync();
            var response = entity.Adapt<OrderModel>();
            return Result.Ok(response);
        }
    }
}
