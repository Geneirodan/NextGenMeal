using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Services.Options;

namespace Services;

public abstract class BaseService
{
    protected int ItemsPerPage { get; }
    protected BaseService(IOptions<PaginationOptions> paginationOptions) => ItemsPerPage = paginationOptions.Value.ItemsPerPage;
    protected static Result HandleIdentityResult(IdentityResult result) => result.Succeeded ? Result.Ok() : Fail(result);
    protected static Result Fail(IdentityResult result) => Result.Fail(result.Errors.Select(e => e.Description));
}
