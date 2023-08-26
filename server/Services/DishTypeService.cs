using DataAccess;
using DataAccess.Entities;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Constants;
using Services.Options;

namespace Services;

public interface IDishTypeService
{
    Task<Result<string>> AddAsync(string type);
    Task<Result> DeleteAsync(string type);
    Task<List<string>> GetAsync();
}

public class DishTypeService : BaseService, IDishTypeService
{
    private readonly ApplicationContext context;

    public DishTypeService(ApplicationContext context, IOptions<PaginationOptions> paginationOptions) 
        : base(paginationOptions) => this.context = context;

    public async Task<Result<string>> AddAsync(string type)
    {
        var entity = new DishType { Name = type };
        await context.AddAsync(entity);
        await context.SaveChangesAsync();
        return Result.Ok(entity.Name);
    }

    public async Task<Result> DeleteAsync(string type)
    {
        var entity = await context.FindAsync<DishType>(type);
        if (entity is null)
            return Result.Fail(Errors.NotFound);
        if (entity.Dishes.Count > 0)
            return Result.Fail(Errors.Forbidden);
        context.Remove(entity);
        await context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<List<string>> GetAsync() => await context.DishTypes.Select(x => x.Name).ToListAsync();
}
