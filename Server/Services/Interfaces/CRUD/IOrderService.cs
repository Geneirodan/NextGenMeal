using FluentResults;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces.CRUD
{
    public interface IOrderService : ICrudService<OrderModel>
    {
        public Task<List<OrderModel>> GetAsync(ClaimsPrincipal principal);
    }
}
