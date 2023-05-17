using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using Services.Models;

namespace Services
{
    public class DishService : CrudService<DishModel, Dish>, IDishService
    {
        public DishService(ApplicationContext context, UserManager<User> userManager) : base(context, userManager)
        {
        }

        public PagedArrayModel<DishModel> Get(int cateringId, IEnumerable<string> types, int page, string query)
        {
            var enumerable = context.Set<Dish>()
                                    .Where(x => x.CateringId == cateringId && x.Name.Contains(query))
                                    .OrderBy(x => x.Price)
                                    .AsEnumerable();
            if (types.Any())
                enumerable = enumerable.Where(x => types.Contains(x.Type));
            var entities = enumerable.Skip((page - 1) * Utils.ItemsPerPage)
                                     .Take(Utils.ItemsPerPage)
                                     .ToList();
            var models = entities.Adapt<List<DishModel>>();
            return new PagedArrayModel<DishModel>(models, enumerable.Count());
        }
    }
}
