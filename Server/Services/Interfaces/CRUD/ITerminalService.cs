using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces.CRUD
{
    public interface ITerminalService : ICrudService<TerminalModel>
    {
        public Task<List<TerminalModel>> GetAsync(int cateringId);
    }
}
