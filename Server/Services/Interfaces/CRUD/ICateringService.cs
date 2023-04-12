using DataAccess.Entities;
using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface ICateringService : ICrudService<CateringModel>
    {
        public Task<List<CateringModel>> GetAsync(string serviceId);
    }
}
