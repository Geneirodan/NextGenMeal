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

        public async Task<List<TerminalModel>> GetAsync(int cateringId) => await GetAsync(x => x.CateringId == cateringId);
    }
}
