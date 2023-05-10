using FluentResults;
using Microsoft.AspNetCore.Authentication;
using Services.Models;
using Services.Models.Register;
using Services.Models.Users;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<Result<TModel>> RegisterAsync<TModel>(RegisterModel model, string callbackUrl)
            where TModel : UserModel;
        Task<Result> LoginAsync(string email, string password);
        Task<Result> DeleteAsync(ClaimsPrincipal principal);
        Task<Result> ForgotPasswordAsync(string email, string callbackUrl);
        Task<Result> ResetPasswordAsync(string email, string password, string token);
        Task<Result> ConfirmEmailAsync(string id, string code);
        Task LogoutAsync();
        Task<Result> ChangePasswordAsync(string oldPassword, string newPassword, ClaimsPrincipal principal);
        Task<Result> AddPasswordAsync(string password, ClaimsPrincipal principal);
        Task<Result> ChangeNameAsync(string name, ClaimsPrincipal principal);
        Task<UserModel?> GetUser(ClaimsPrincipal principal);
        string? GetUserId(ClaimsPrincipal principal);
        Task<string?> GetRole(ClaimsPrincipal principal);
        AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string redirectUrl);
        Task<Result> GoogleAuth();
        Task<Result> DeleteAsync(ClaimsPrincipal principal, string id);
        Task<Result> ChangeNameAsync(string name, ClaimsPrincipal principal, string id);
        Task<PagedArrayModel<EmployeeModel>> GetEmployeesAsync(int cateringId, int page, string query);
    }
}
