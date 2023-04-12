using DataAccess;
using DataAccess.Entities;
using Services.Interfaces.CRUD;
using Services.Models;

namespace Services.CRUD
{
    public class DishService : CrudService<DishModel, Dish>, IDishService
    {
        public DishService(ApplicationContext context) : base(context)
        {
        }

        public async Task<List<DishModel>> GetAsync(int cateringId) => await GetAsync(x => x.CateringId == cateringId);
    }
}
