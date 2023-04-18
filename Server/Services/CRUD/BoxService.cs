using DataAccess;
using DataAccess.Entities;
using Services.Interfaces.CRUD;
using Services.Models;

namespace Services.CRUD
{
    public class BoxService : CrudService<BoxModel, Box>, IBoxService
    {
        public BoxService(ApplicationContext context) : base(context)
        {
        }

        public async Task<PagedArrayModel<BoxModel>> GetAsync(int terminalId, int page = 1) =>
            await base.GetAsync(page, x => x.TerminalId == terminalId, x => x.Id);
    }
}
