using DataAccess;
using DataAccess.Entities;
using Services.Interfaces.CRUD;
using Services.Models;

namespace Services.CRUD
{
    public class CateringService : CrudService<CateringModel, Catering>, ICateringService
    {
        public CateringService(ApplicationContext context) : base(context)
        {
        }

        public async Task<List<CateringModel>> GetAsync(string serviceId) => await GetAsync(x => x.ServiceId == serviceId);
    }
}
