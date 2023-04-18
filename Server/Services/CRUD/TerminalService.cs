using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Services.Interfaces.CRUD;
using Services.Models;
using System;

namespace Services.CRUD
{
    public class TerminalService : CrudService<TerminalModel, Terminal>, ITerminalService
    {
        public TerminalService(ApplicationContext context) : base(context) { }

        public async Task<PagedArrayModel<TerminalModel>> GetAsync(int cateringId, int page = 1) =>
            await GetAsync(page, x => x.CateringId == cateringId, x => x.SerialNumber);
    }
}
