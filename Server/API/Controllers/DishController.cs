using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;
using Settings.Constants;

namespace API.Controllers
{
    [Authorize(Roles = Roles.Service)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class DishController : CrudController<DishModel, DishRequest>
    {
        private IDishService DishService => (service as IDishService)!;
        public DishController(IDishService service) : base(service) { }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<DishModel>>> GetAsync(int cateringId) => await DishService.GetAsync(cateringId);
    }
}
