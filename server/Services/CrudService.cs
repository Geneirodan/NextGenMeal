using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Constants;
using Services.Interfaces;
using Services.Models;
using Services.Options;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Services;

public abstract class CrudService<TModel, TEntity> : BaseService, ICrudService<TModel>
    where TModel : class
    where TEntity : class, IOwnedEntity
{
    protected readonly ApplicationContext context;
    protected readonly UserManager<User> userManager;

    protected CrudService(ApplicationContext context, UserManager<User> userManager, IOptions<PaginationOptions> options) : base(options)
    {
        this.context = context;
        this.userManager = userManager;
    }
    public virtual async Task<Result<TModel>> AddAsync(ClaimsPrincipal principal, TModel model)
    {
        var userId = userManager.GetUserId(principal);
        var proxy = context.Set<TEntity>().CreateProxy();
        context.Entry(proxy).CurrentValues.SetValues(model);
        await context.AddAsync(proxy);
        if (proxy.GetOwnerId() != userId)
            return Result.Fail(Errors.Forbidden);
        await context.SaveChangesAsync();
        var response = proxy.Adapt<TModel>();
        return Result.Ok(response);
    }

    public virtual async Task<Result> DeleteAsync(ClaimsPrincipal principal, int id)
    {
        var userId = userManager.GetUserId(principal);
        var entity = await context.FindAsync<TEntity>(id);
        if (entity is null)
            return Result.Fail(Errors.NotFound);
        if (entity.GetOwnerId() != userId)
            return Result.Fail(Errors.Forbidden);
        context.Remove(entity);
        await context.SaveChangesAsync();
        return Result.Ok();
    }

    public virtual async Task<Result> EditAsync(ClaimsPrincipal principal, TModel model)
    {
        var userId = userManager.GetUserId(principal);
        var proxy = context.Set<TEntity>().CreateProxy();
        context.Entry(proxy).CurrentValues.SetValues(model);
        context.Update(proxy);
        if (proxy.GetOwnerId() != userId)
            return Result.Fail(Errors.Forbidden);
        await context.SaveChangesAsync();
        return Result.Ok();
    }

    public async Task<TModel?> GetByIdAsync(int id)
    {
        var entity = await context.FindAsync<TEntity>(id);
        return entity?.Adapt<TModel>();
    }

    protected async Task<PagedArrayModel<TModel>> GetAsync(int page,
        Expression<Func<TEntity, object>> keySelector,
        params Expression<Func<TEntity, bool>>[] predicates)
    {
        IQueryable<TEntity> query = context.Set<TEntity>();
        query = predicates.Aggregate(query, (current, expression) => current.Where(expression));
        var entities = await query.OrderBy(keySelector)
            .Skip((page - 1) * ItemsPerPage)
            .Take(ItemsPerPage)
            .ToListAsync();
        var models = entities.Adapt<List<TModel>>();
        return new PagedArrayModel<TModel>(models, query.Count());
    }
}
