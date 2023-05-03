using API.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;
using Services.Models.Users;
using System.ComponentModel.DataAnnotations;
using Utils.Constants;

namespace API.Controllers
{
    [ApiController]
    [Route(Routes.CrudRoute)]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class OrderController : BaseController
    {
        private readonly IOrderService orderService;
        public OrderController(IOrderService orderService) => this.orderService = orderService;

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<OrderModel>>> GetAsync(int page = 1) =>
            await orderService.GetAsync(User, page);

        [HttpGet("Optimal")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<OrderDishModel>> GetOptimal(int cateringId, int maxPrice, [FromQuery] Dictionary<string, int> types)
        {
            types.Remove("maxPrice");
            types.Remove("cateringId");
            var result = orderService.GetOptimal(cateringId, maxPrice, types);
            return HandleResult(result);
        }

        [HttpPost]
        [Authorize(Roles = Roles.CustomerEmployee)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<ActionResult<OrderModel>> AddAsync([FromBody] OrderRequest request)
        {
            var model = request.Adapt<OrderModel>();
            var result = await orderService.AddAsync(model);
            return HandleCreatedResult(result);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.CustomerEmployee)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> DeleteAsync([Required] int id)
        {
            var result = await orderService.DeleteAsync(User, id);
            return HandleResult(result);
        }

        [HttpGet("Services")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PagedArrayModel<ServiceModel>>> GetServices(int page = 1, string query = "", string? country = null) =>
            await orderService.GetServicesAsync(page, query, country);
    }
}
