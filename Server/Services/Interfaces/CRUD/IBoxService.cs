using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface IBoxService : ICrudService<BoxModel>
    {
        public Task<List<BoxModel>> GetAsync(int terminalId);
    }
}
