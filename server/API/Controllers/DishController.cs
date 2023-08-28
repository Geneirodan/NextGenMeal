using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Constants;
using Services.Interfaces;
using Services.Models;

namespace API.Controllers;

[Authorize(Roles = Roles.Service)]
[ProducesResponseType(StatusCodes.Status403Forbidden)]
public class DishController : CrudController<DishModel, DishRequest>
{
    public DishController(IDishService service) : base(service){ }

    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedArrayModel<DishModel>>> GetAsync(int cateringId,
        string? types = null,
        int page = 1,
        string query = "")
    {
        var dishService = service as IDishService;
        return await dishService!.GetAsync(cateringId, types?.Split(','), page, query);
    }
}
