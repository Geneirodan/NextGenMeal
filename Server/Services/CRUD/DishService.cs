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

        public async Task<PagedArrayModel<DishModel>> GetAsync(int cateringId, int page = 1) =>
            await base.GetAsync(page, x => x.CateringId == cateringId, x => x.Price);
    }
}
