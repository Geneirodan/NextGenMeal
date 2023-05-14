using FluentResults;
using Services.Models;
using Services.Models.Users;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IOrderService
    {
        public Task<PagedArrayModel<OrderModel>> GetAsync(ClaimsPrincipal user,
                                                          int page,
                                                          bool? isBox,
                                                          DateTime startTime,
                                                          DateTime endTime);
        public Task<Result<OrderModel>> AddAsync(ClaimsPrincipal user, OrderModel model);
        public Task<Result> DeleteAsync(ClaimsPrincipal user, int id);
        public Result<List<OrderDishModel>> GetOptimal(int cateringId, decimal maxPrice, Dictionary<string, int> types);
        public Task<PagedArrayModel<ServiceModel>> GetServicesAsync(int page, string query, string? country);
        public Task<Result> DoAsync(ClaimsPrincipal principal, int id);
        public Task<Result> ReceiveAsync(ClaimsPrincipal principal, int id);
    }
}
