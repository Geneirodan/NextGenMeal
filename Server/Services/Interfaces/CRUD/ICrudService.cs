using FluentResults;
using Services.Models;
using System.Security.Claims;

namespace Services.Interfaces.CRUD
{
    public interface ICrudService<TModel> where TModel : EntityModel
    {
        public Task<TModel?> GetByIdAsync(int id);
        public Task<Result<TModel>> AddAsync(ClaimsPrincipal user, TModel model);
        public Task<Result> DeleteAsync(ClaimsPrincipal user, int id);
        public Task<Result> EditAsync(ClaimsPrincipal user, TModel model);
    }
}
