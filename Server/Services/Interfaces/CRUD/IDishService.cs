﻿using Services.Models;

namespace Services.Interfaces.CRUD
{
    public interface IDishService : ICrudService<DishModel>
    {
        public PagedArrayModel<DishModel> Get(int cateringId, IEnumerable<string> types, int page, string query);
    }
}
