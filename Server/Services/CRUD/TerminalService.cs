using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces.CRUD;
using Services.Models;
using System;

namespace Services.CRUD
{
    public class TerminalService : CrudService<TerminalModel, Terminal>, ITerminalService
    {

        public TerminalService(ApplicationContext context, UserManager<User> userManager) : base(context, userManager)
        {
        }

        public async Task<TerminalModel?> GetAsync(int cateringId)
        {
            var terminal = await context.Terminals.FindAsync(cateringId);
            return terminal?.Adapt<TerminalModel>();
        }
    }
}
