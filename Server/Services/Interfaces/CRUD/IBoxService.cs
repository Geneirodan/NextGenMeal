using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface IBoxService : ICrudService<BoxModel>
    {
        public Task<PagedArrayModel<BoxModel>> GetAsync(int terminalId, int page = 1);
    }
}
