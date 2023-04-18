﻿using FluentResults;
using Microsoft.AspNetCore.Authentication;
using Services.Models.Register;
using Services.Models.Users;
using System.Security.Claims;

namespace Services.Interfaces
{
    public interface IUserService
    {
        public Task<Result<TModel>> RegisterAsync<TModel>(RegisterModel model, string callbackUrl)
            where TModel : UserModel;
        public Task<Result> LoginAsync(string email, string password);
        public Task<Result> DeleteAsync(ClaimsPrincipal principal);
        public Task<Result> ForgotPasswordAsync(string email, string callbackUrl);
        public Task<Result> ResetPasswordAsync(string email, string password, string token);
        public Task<Result> ConfirmEmailAsync(string id, string code);
        public Task LogoutAsync();
        public Task<Result> ChangePasswordAsync(string oldPassword, string newPassword, ClaimsPrincipal principal);
        public Task<Result> AddPasswordAsync(string password, ClaimsPrincipal principal);
        public Task<Result> ChangeNameAsync(string name, ClaimsPrincipal principal);
        public Task<TModel?> GetUser<TModel>(ClaimsPrincipal principal)
            where TModel : UserModel;
        public Task<string?> GetRole(ClaimsPrincipal principal);
        public AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string redirectUrl);
        public Task<Result> GoogleAuth();
    }
}
