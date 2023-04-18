using FluentResults;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces.CRUD
{
    public interface IOrderService : ICrudService<OrderModel>
    {
        public Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page = 1);
    }
}
