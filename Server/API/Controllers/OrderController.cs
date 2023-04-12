using API.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;
using Settings.Constants;
using System.ComponentModel.DataAnnotations;

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
        public async Task<ActionResult<List<OrderModel>>> GetAsync() => await orderService.GetAsync(User);
        [HttpPost]
        [Authorize(Roles = Roles.Customer)]
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> DeleteAsync([Required] int id)
        {
            var result = await orderService.DeleteAsync(id);
            return HandleResult(result);
        }
    }
}
