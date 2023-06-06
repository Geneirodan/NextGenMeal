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
    [Authorize(Roles = Roles.CustomerEmployee)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class OrderController : BaseController
    {
        private readonly IOrderService orderService;
        public OrderController(IOrderService orderService) => this.orderService = orderService;

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<OrderModel>>> GetAsync(DateTime? startTime,
                                                                              DateTime? endTime,
                                                                              int page = 1,
                                                                              bool? isBox = null,
                                                                              string? status = null) =>
            await orderService.GetAsync(User,
                                        page,
                                        isBox,
                                        startTime ?? DateTime.MinValue,
                                        endTime ?? DateTime.MaxValue,
                                        status);

        [HttpGet(Routes.Action)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<OrderDishModel>> Optimal(int cateringId,
                                                          int maxPrice,
                                                          [FromQuery] Dictionary<string, int> types)
        {
            types.Remove("maxPrice");
            types.Remove("cateringId");
            var result = orderService.GetOptimal(cateringId, maxPrice, types);
            return HandleResult(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<ActionResult<OrderModel>> AddAsync([FromBody] OrderRequest request)
        {
            var model = request.Adapt<OrderModel>();
            var result = await orderService.AddAsync(User, model);
            return HandleCreatedResult(result);
        }

        [HttpPatch(Routes.Action)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> DoAsync([Required] int id)
        {
            var result = await orderService.DoAsync(User, id);
            return HandleResult(result);
        }

        [HttpPatch(Routes.Action)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> ReceiveAsync([Required] int id)
        {
            var result = await orderService.ReceiveAsync(User, id);
            return HandleResult(result);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> DeleteAsync([Required] int id)
        {
            var result = await orderService.DeleteAsync(User, id);
            return HandleResult(result);
        }

        [HttpGet(Routes.Action)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedArrayModel<ServiceModel>>> ServicesAsync(int page = 1,
                                                                                     string query = "",
                                                                                     string? country = null) =>
            await orderService.GetServicesAsync(page, query, country);
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<OrderModel?>> GetById(int id) => await orderService.GetOrderById(id);
    }
}
