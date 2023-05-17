using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using Services.Models;
using System.Linq.Expressions;
using System.Security.Claims;
using Utils.Constants;

namespace Services
{
    public abstract class CrudService<TModel, TEntity> : ICrudService<TModel>
        where TModel : class
        where TEntity : class, IOwnedEntity
    {
        protected readonly ApplicationContext context;
        protected readonly UserManager<User> userManager;

        public CrudService(ApplicationContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public virtual async Task<PagedArrayModel<TModel>> GetAsync(int page,
                                                                Expression<Func<TEntity, bool>> predicate,
                                                                Expression<Func<TEntity, object>> keySelector,
                                                                bool isDesc = false)
        {
            var query = context.Set<TEntity>().Where(predicate);
            query = isDesc ? query.OrderByDescending(keySelector) : query.OrderBy(keySelector);
            var entities = await query.Skip((page - 1) * Utils.ItemsPerPage)
                                      .Take(Utils.ItemsPerPage)
                                      .ToListAsync();
            var models = entities.Adapt<List<TModel>>();
            return new PagedArrayModel<TModel>(models, query.Count());
        }
        public virtual async Task<Result<TModel>> AddAsync(ClaimsPrincipal principal, TModel model)
        {
            var userId = userManager.GetUserId(principal);
            var entity = model.Adapt<TEntity>();
            var proxy = context.Set<TEntity>().CreateProxy();
            context.Entry(proxy).CurrentValues.SetValues(entity);
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
            var entity = model.Adapt<TEntity>();
            var proxy = context.Set<TEntity>().CreateProxy();
            context.Entry(proxy).CurrentValues.SetValues(entity);
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
    }
}
