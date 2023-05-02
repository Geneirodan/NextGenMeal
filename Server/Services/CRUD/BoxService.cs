using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces.CRUD;
using Services.Models;
using System.Linq.Expressions;

namespace Services.CRUD
{
    public class BoxService : CrudService<BoxModel, Box>, IBoxService
    {
        public BoxService(ApplicationContext context, UserManager<User> userManager) : base(context, userManager)
        {
        }

        public async Task<PagedArrayModel<BoxModel>> GetAsync(int terminalId, int page, string query) =>
            await GetAsync(page: page,
                           predicate: x => x.TerminalId == terminalId && x.Name.Contains(query),
                           keySelector: x => x.Id);
    }
}
