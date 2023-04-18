using DataAccess.Entities;
using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface ICateringService : ICrudService<CateringModel>
    {
        public Task<PagedArrayModel<CateringModel>> GetAsync(string serviceId, int page = 1);
    }
}
