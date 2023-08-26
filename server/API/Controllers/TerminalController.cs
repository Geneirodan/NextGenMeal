using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Constants;
using Services.Interfaces;
using Services.Models;

namespace API.Controllers;

[Authorize(Roles = Roles.Service)]
[ProducesResponseType(StatusCodes.Status403Forbidden)]
public class TerminalController : CrudController<TerminalModel, TerminalRequest>
{
    public TerminalController(ITerminalService service) : base(service) { }
}
