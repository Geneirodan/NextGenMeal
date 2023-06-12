using API.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;
using Utils.Constants;

namespace API.Controllers
{
    [ApiController]
    [Route(Routes.CRUD_ROUTE)]
    [Authorize(Roles = Roles.Service)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class CateringController : CrudController<CateringModel, CateringRequest>
    {
        private readonly IUserService userService;
        public CateringController(ICateringService cateringService, IUserService userService) : base(cateringService) => this.userService = userService;

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<CateringModel>>> GetAsync(int page = 1, string query = "")
        {
            var cateringService = service as ICateringService;
            return await cateringService!.GetAsync(User, page, query);
        }

        [HttpGet("{serviceId}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<CateringModel>>> GetAsync(string serviceId, int page = 1, string query = "")
        {
            var cateringService = service as ICateringService;
            return await cateringService!.GetAsync(serviceId, page, query);
        }

        [HttpGet(Routes.ACTION + "/{id}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<CateringModel?> GetCateringById(int id) => await service.GetByIdAsync(id);

        public override Task<ActionResult<CateringModel>> AddAsync([FromBody] CateringRequest request)
        {
            var adaptedRequest = request.Adapt<ServiceCateringRequest>();
            adaptedRequest.ServiceId = userService.GetUserId(User)!;
            return base.AddAsync(adaptedRequest);
        }

        public override Task<IActionResult> EditAsync(int id, [FromBody] CateringRequest request)
        {
            var adaptedRequest = request.Adapt<ServiceCateringRequest>();
            adaptedRequest.ServiceId = userService.GetUserId(User)!;
            return base.EditAsync(id, adaptedRequest);
        }
    }
}
