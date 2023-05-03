using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route(Routes.CrudRoute)]
    public class ServiceController : BaseController
    {
        private readonly IUserService userService;

        public ServiceController(IUserService userService) => this.userService = userService;
    }
}
