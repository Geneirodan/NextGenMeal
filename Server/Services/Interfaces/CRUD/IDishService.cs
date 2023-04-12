using DataAccess.Entities;
using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface IDishService : ICrudService<DishModel>
    {
        public Task<List<DishModel>> GetAsync(int cateringId);
    }
}
