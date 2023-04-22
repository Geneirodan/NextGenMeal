using FluentResults;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IOrderService
    {
        public Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page);
        public Task<Result<OrderModel>> AddAsync(OrderModel model);
        public Task<Result> DeleteAsync(ClaimsPrincipal principal, int id);
    }
}
