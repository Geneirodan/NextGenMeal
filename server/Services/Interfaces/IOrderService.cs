using FluentResults;
using Services.Models;
using Services.Models.Users;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IOrderService
    {
        public Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal principal, int page);
        public Task<Result<OrderModel>> AddAsync(OrderModel model);
        public Task<Result> DeleteAsync(ClaimsPrincipal principal, int id);
        public Result<List<OrderDishModel>> GetOptimal(int cateringId, decimal maxPrice, Dictionary<string, int> types);
        public Task<PagedArrayModel<ServiceModel>> GetServicesAsync(int page, string query, string? country);
    }
}
