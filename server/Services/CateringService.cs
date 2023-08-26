using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Services.Interfaces;
using Services.Models;
using Services.Options;
using System.Security.Claims;

namespace Services;

public class CateringService : CrudService<CateringModel, Catering>, ICateringService
{
    public CateringService(ApplicationContext context, UserManager<User> userManager, IOptions<PaginationOptions> options)
        : base(context, userManager, options)
    {
    }
    public async Task<PagedArrayModel<CateringModel>> GetAsync(string serviceId, int page, string query) =>
        await base.GetAsync(page,
            x => x.ServiceId == serviceId
                 && (x.Name.Contains(query)
                     || x.City.Contains(query)
                     || x.State.Contains(query)
                     || x.Street.Contains(query)),
            x => x.Id);

    public async Task<PagedArrayModel<CateringModel>> GetAsync(ClaimsPrincipal principal, int page, string query)
    {
        var serviceId = userManager.GetUserId(principal);
        return await GetAsync(serviceId!, page, query);
    }
}
