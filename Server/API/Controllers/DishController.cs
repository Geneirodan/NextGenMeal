using API.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;
using Utils.Constants;

namespace API.Controllers
{
    [Authorize(Roles = Roles.Service)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public class DishController : CrudController<DishModel, DishRequest>
    {
        private readonly IConfiguration configuration;
        public DishController(IDishService service, IConfiguration configuration) : base(service) => this.configuration = configuration;

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<PagedArrayModel<DishModel>> Get(int cateringId,
                                                            [FromQuery] List<string> types,
                                                            int page = 1,
                                                            string query = "")
        {
            var dishService = service as IDishService;
            return dishService!.Get(cateringId, types, page, query);
        }

        [HttpGet("Types")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<string?[]> GetTypes() => configuration.GetSection("Dish:Types")
                                                                  .GetChildren()
                                                                  .AsEnumerable()
                                                                  .Select(x => x.Value)
                                                                  .ToArray();
    }
}
