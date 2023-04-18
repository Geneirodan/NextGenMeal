using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces.CRUD
{
    public interface ITerminalService : ICrudService<TerminalModel>
    {
        public Task<PagedArrayModel<TerminalModel>> GetAsync(int cateringId, int page = 1);
    }
}
