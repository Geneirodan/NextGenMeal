using DataAccess.Entities;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface ICateringService : ICrudService<CateringModel>
    {
        public Task<PagedArrayModel<CateringModel>> GetAsync(string serviceId, int page, string query);
        public Task<PagedArrayModel<CateringModel>> GetAsync(ClaimsPrincipal principal, int page, string query);
    }
}
