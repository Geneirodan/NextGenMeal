using Services.Models;

namespace Services.Interfaces
{
    public interface ITerminalService : ICrudService<TerminalModel>
    {
        public Task<TerminalModel?> GetAsync(int cateringId);
    }
}
