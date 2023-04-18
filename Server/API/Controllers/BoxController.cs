using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;
using Settings.Constants;

namespace API.Controllers
{
    [Authorize(Roles = Roles.Service)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class BoxController : CrudController<BoxModel, BoxRequest>
    {
        public BoxController(IBoxService service) : base(service) { }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<BoxModel>>> GetAsync(int terminalId)
        {
            var boxService = service as IBoxService;
            return await boxService!.GetAsync(terminalId);
        }
    }
}