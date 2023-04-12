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
        private IBoxService BoxService => (service as IBoxService)!;
        public BoxController(IBoxService service) : base(service) { }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<BoxModel>>> GetAsync(int terminalId) => await BoxService.GetAsync(terminalId);
    }
}