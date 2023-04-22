using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;
using Utils.Constants;

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
        public async Task<ActionResult<PagedArrayModel<BoxModel>>> GetAsync(int terminalId, int page = 1, string query = "")
        {
            var boxService = service as IBoxService;
            return await boxService!.GetAsync(terminalId, page, query);
        }
    }
}