using DataAccess.Entities;
using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface IDishService : ICrudService<DishModel>
    {
        public Task<PagedArrayModel<DishModel>> GetAsync(int cateringId, int page = 1);
    }
}
