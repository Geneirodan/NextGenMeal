using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;
using Utils.Constants;

namespace API.Controllers
{
    [Authorize(Roles = Roles.Service)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class TerminalController : CrudController<TerminalModel, TerminalRequest>
    {
        public TerminalController(ITerminalService service) : base(service) { }
    }
}
