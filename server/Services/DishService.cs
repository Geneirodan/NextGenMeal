using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Interfaces;
using Services.Models;
using Services.Options;

namespace Services;

public class DishService : CrudService<DishModel, Dish>, IDishService
{
    public DishService(ApplicationContext context, UserManager<User> userManager, IOptions<PaginationOptions> options)
        : base(context, userManager, options)
    {
    }

    public async Task<PagedArrayModel<DishModel>> GetAsync(int cateringId, string[]? types, int page,
        string query)
    {
        var enumerable = await context.Set<Dish>()
            .Where(x => x.CateringId == cateringId && x.Name.Contains(query))
            .OrderBy(x => x.Price)
            .ToListAsync();
        if (types is not null && types.Any())
            enumerable = enumerable.Where(x => types.Contains(x.Type)).ToList();
        var entities = enumerable.Skip((page - 1) * ItemsPerPage)
            .Take(ItemsPerPage)
            .ToList();
        var models = entities.Adapt<List<DishModel>>();
        return new PagedArrayModel<DishModel>(models, enumerable.Count);
    }
}
