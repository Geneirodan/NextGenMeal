using Azure;
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

        public async Task<PagedArrayModel<CateringModel>> GetAsync(string serviceId, int page = 1) =>
            await base.GetAsync(page, x => x.ServiceId == serviceId, x => x.Name);
    }
}
