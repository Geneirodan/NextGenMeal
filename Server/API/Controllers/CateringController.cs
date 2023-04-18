using API.Requests;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;

namespace API.Controllers
{
    [ApiController]
    [Route(Routes.CrudRoute)]
    //[Authorize(Roles = Roles.Service)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class CateringController : CrudController<CateringModel, CateringRequest>
    {
        private ICateringService CateringService => (service as ICateringService)!;

        public CateringController(ICateringService cateringService) : base(cateringService) { }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<CateringModel>>> GetAsync(string serviceId) => await CateringService.GetAsync(serviceId);

    }
}
