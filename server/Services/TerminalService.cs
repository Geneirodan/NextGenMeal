using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using Services.Models;
using System.Security.Claims;
using Utils.Constants;

namespace Services
{
    public class TerminalService : CrudService<TerminalModel, Terminal>, ITerminalService
    {

        public TerminalService(ApplicationContext context, UserManager<User> userManager) : base(context, userManager)
        {
        }

        public override async Task<Result<TerminalModel>> AddAsync(ClaimsPrincipal principal, TerminalModel model)
        {
            model.Cells = new string[model.CellCount];
            return await base.AddAsync(principal, model);
        }

        public override async Task<Result> EditAsync(ClaimsPrincipal principal, TerminalModel model)
        {
            var terminal = await context.Terminals.AsNoTracking().FirstOrDefaultAsync(t => t.Id == model.Id);
            if (terminal is null)
                return Result.Fail(Errors.NOT_FOUND);
            model.Cells = terminal.Cells;
            if(model.CellCount > 0)
            {
                var array = model.Cells;
                Array.Resize(ref array, model.CellCount);
                model.Cells = array;
            }
            return await base.EditAsync(principal, model);
        }

        public async Task<TerminalModel?> GetAsync(int cateringId)
        {
            var terminal = await context.Terminals.FindAsync(cateringId);
            return terminal?.Adapt<TerminalModel>();
        }
    }
}
