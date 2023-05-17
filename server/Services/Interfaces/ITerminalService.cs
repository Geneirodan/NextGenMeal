using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface ITerminalService : ICrudService<TerminalModel>
    {
        public Task<TerminalModel?> GetAsync(int cateringId);
    }
}
