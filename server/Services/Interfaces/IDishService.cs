using Services.Models;

namespace Services.Interfaces;

public interface IDishService : ICrudService<DishModel>
{
    public Task<PagedArrayModel<DishModel>> GetAsync(int cateringId, string[]? types, int page, string query);
}
