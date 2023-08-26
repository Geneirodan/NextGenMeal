using FluentResults;
using System.Security.Claims;

namespace Services.Interfaces;

public interface ICrudService<TModel> where TModel : class
{
    public Task<TModel?> GetByIdAsync(int id);
    public Task<Result<TModel>> AddAsync(ClaimsPrincipal user, TModel model);
    public Task<Result> DeleteAsync(ClaimsPrincipal user, int id);
    public Task<Result> EditAsync(ClaimsPrincipal user, TModel model);
}
