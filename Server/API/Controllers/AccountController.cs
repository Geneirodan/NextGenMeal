using API.Requests.Account;
using API.Requests.Account.Register;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models.Users;
using Settings.Constants;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route(Routes.DefaultRoute)]
    public class AccountController : BaseController
    {
        private readonly IUserService userService;

        public AccountController(IUserService userService,
                                 UserManager<User> userManager,
                                 RoleManager<IdentityRole> roleManager)
        {
            this.userService = userService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            var result = await userService.LoginAsync(request.Email, request.Password);
            return HandleResult(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserModel>> RegisterAsync([FromBody] CustomerRegisterRequest request, string callbackUrl)
        {
            return await RegisterAsync<UserModel>(request, callbackUrl);
        }

        [HttpPost(Roles.Service)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ServiceModel>> RegisterAsync([FromBody] ServiceRegisterRequest request, string callbackUrl)
        {
            return await RegisterAsync<ServiceModel>(request, callbackUrl);
        }

        [HttpPost(Roles.Employee)]
        [Authorize(Roles = Roles.Service)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<EmployeeModel>> RegisterAsync([FromBody] EmployeeRegisterRequest request, string callbackUrl)
        {
            return await RegisterAsync<EmployeeModel>(request, callbackUrl);
        }

        private async Task<ActionResult<TModel>> RegisterAsync<TModel>(RegisterRequest request, string callbackUrl) where TModel : UserModel
        {
            var model = request.CreateModel();
            var result = await userService.RegisterAsync<TModel>(model, callbackUrl);
            return HandleCreatedResult(result);
        }

        [HttpDelete]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> LogoutAsync()
        {
            await userService.LogoutAsync();
            return Ok();
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<UserModel?>> Info() => await userService.GetUser<UserModel>(User);

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<string?>> RoleAsync() => await userService.GetRole(User);

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ConfirmEmailAsync(string id, string code)
        {
            var result = await userService.ConfirmEmailAsync(id, code);
            return HandleResult(result);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.CustomerService)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAsync()
        {
            var result = await userService.DeleteAsync(User);
            return HandleResult(result);
        }

        [HttpPatch]
        [Authorize(Roles = Roles.CustomerService)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> ChangeName([FromBody] ChangeNameRequest model)
        {
            var result = await userService.ChangeNameAsync(model.Name, User);
            return HandleResult(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model, string callbackUrl)
        {
            var result = await userService.ForgotPasswordAsync(model.Email, callbackUrl);
            return result.IsSuccess ? Ok() : NotFound();
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordRequest model)
        {
            var result = await userService.ResetPasswordAsync(model.Email, model.Password, model.Code);
            return HandleResult(result);
        }

        [HttpPatch]
        [Authorize(Roles = Roles.CustomerService)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest model)
        {
            var result = await userService.ChangePasswordAsync(model.OldPassword, model.NewPassword, User);
            return HandleResult(result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status302Found)]
        public IActionResult GoogleAuth(string? returnUrl = null)
        {
            returnUrl ??= Request.Headers["Origin"].FirstOrDefault() ?? Url.Content("/");
            string? redirectUrl = Url.Action("GoogleResponse", "Account", new { returnUrl });
            AuthenticationProperties properties = userService.ConfigureExternalAuthenticationProperties("Google", redirectUrl!);
            return new ChallengeResult("Google", properties);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status302Found)]
        public async Task<IActionResult> GoogleResponseAsync(string returnUrl)
        {
            await userService.GoogleAuth();
            return Redirect(returnUrl);
        }

    }
}
