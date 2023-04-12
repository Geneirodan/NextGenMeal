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

        public async Task<List<BoxModel>> GetAsync(int terminalId) => await GetAsync(x => x.TerminalId == terminalId);
    }
}
