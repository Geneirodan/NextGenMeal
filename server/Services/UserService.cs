﻿using DataAccess;
using DataAccess.Entities.Users;
using FluentResults;
using Mapster;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services.Constants;
using Services.Interfaces;
using Services.Models;
using Services.Models.Register;
using Services.Models.Users;
using Services.Options;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace Services;

public class UserService : BaseService, IUserService
{
    private readonly ApplicationContext context;
    private readonly IEmailSender emailSender;
    private readonly SignInManager<User> signInManager;
    private readonly UserManager<User> userManager;

    public UserService(UserManager<User> userManager,
        SignInManager<User> signInManager,
        IEmailSender emailSender,
        RoleManager<IdentityRole> roleManager,
        IOptions<AdminOptions> configuration,
        ApplicationContext context,
        IOptions<PaginationOptions> paginationOptions) : base(paginationOptions)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
        this.emailSender = emailSender;
        this.context = context;
        InitializeAsync(userManager, roleManager, configuration.Value).Wait();
    }

    public async Task<Result> AddPasswordAsync(string password, ClaimsPrincipal principal)
    {
        var user = await userManager.GetUserAsync(principal);
        var result = await userManager.AddPasswordAsync(user!, password);
        return HandleIdentityResult(result);
    }

    public async Task<Result> ChangePasswordAsync(string oldPassword, string newPassword, ClaimsPrincipal principal)
    {
        var user = await userManager.GetUserAsync(principal);
        var result = await userManager.ChangePasswordAsync(user!, oldPassword, newPassword);
        return HandleIdentityResult(result);
    }

    public async Task<Result> ConfirmEmailAsync(string id, string code)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            return Result.Fail(Errors.NotFound);
        var result = await userManager.ConfirmEmailAsync(user, code);
        return HandleIdentityResult(result);
    }

    public async Task<Result> DeleteAsync(ClaimsPrincipal principal)
    {
        var user = await userManager.GetUserAsync(principal);
        await signInManager.SignOutAsync();
        var result = await userManager.DeleteAsync(user!);
        return HandleIdentityResult(result);
    }
    public async Task<Result> DeleteAsync(ClaimsPrincipal principal, string id)
    {
        var userId = userManager.GetUserId(principal);
        var user = await context.Employees.FindAsync(id);
        if (user is null) return Result.Fail(Errors.NotFound);
        if (user.GetOwnerId() != userId) return Result.Fail(Errors.Forbidden);
        var result = await userManager.DeleteAsync(user);
        return HandleIdentityResult(result);
    }

    public async Task<Result> ChangeNameAsync(string name, ClaimsPrincipal principal)
    {
        var user = await userManager.GetUserAsync(principal);
        user!.Name = name;
        var result = await userManager.UpdateAsync(user);
        return HandleIdentityResult(result);
    }

    public async Task<Result> ChangeNameAsync(string name, ClaimsPrincipal principal, string id)
    {
        var userId = userManager.GetUserId(principal);
        var user = await context.Employees.FindAsync(id);
        if (user is null)
            return Result.Fail(Errors.NotFound);
        if (user.GetOwnerId() != userId)
            return Result.Fail(Errors.Forbidden);
        user.Name = name;
        var result = await userManager.UpdateAsync(user);
        return HandleIdentityResult(result);
    }

    public async Task<Result> ForgotPasswordAsync(string email, string callbackUrl)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user is null || !await userManager.IsEmailConfirmedAsync(user)) return Result.Fail(Errors.NotFound);
        var code = await userManager.GeneratePasswordResetTokenAsync(user);
        callbackUrl += $"?email={email}&code={UrlEncoder.Default.Encode(code)}";
        _ = emailSender.SendEmailAsync(email, EmailTemplates.ForgotPassword, callbackUrl);
        return Result.Ok();
    }

    public async Task<Result> LoginAsync(string email, string password)
    {
        var result = await signInManager.PasswordSignInAsync(email, password, true, false);
        if (result.IsLockedOut)
            return Result.Fail(Errors.Forbidden).WithError(Errors.IsLockedOut);
        if (result.IsNotAllowed)
            return Result.Fail(Errors.Forbidden).WithError(Errors.IsNotAllowed);
        return result.Succeeded ? Result.Ok() : Result.Fail(Errors.InvalidCredentials);
    }

    public async Task LogoutAsync() => await signInManager.SignOutAsync();

    public async Task<Result<TModel>> RegisterAsync<TModel>(RegisterModel model, string callbackUrl)
        where TModel : UserModel
    {

        var user = model.Create();
        var result = await userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded) return Fail(result);
        result = await userManager.AddToRoleAsync(user, model.GetRole());
        if (!result.Succeeded) return Fail(result);
        var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
        callbackUrl += $"?id={user.Id}&code={UrlEncoder.Default.Encode(code)}";
        _ = emailSender.SendEmailAsync(model.Email, EmailTemplates.Register, callbackUrl);
        return Result.Ok(user.Adapt<TModel>());
    }

    public async Task<Result> ResetPasswordAsync(string email, string password, string token)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user is null) return Result.Fail(Errors.NotFound);
        var result = await userManager.ResetPasswordAsync(user, token, password);
        return HandleIdentityResult(result);
    }

    public async Task<UserModel?> GetUser(ClaimsPrincipal principal)
    {
        var user = await userManager.GetUserAsync(principal);
        var role = await userManager.GetRolesAsync(user!);
        return role.FirstOrDefault() switch
        {
            Roles.Service => user!.Adapt<ServiceModel>(),
            Roles.Employee => user!.Adapt<EmployeeModel>(),
            _ => user!.Adapt<UserModel>()
        };
    }
    public async Task<string?> GetRole(ClaimsPrincipal principal)
    {
        var user = await userManager.GetUserAsync(principal);
        var roles = await userManager.GetRolesAsync(user!);
        return roles.FirstOrDefault();
    }

    public AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string redirectUrl) =>
        signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);

    public async Task<Result> GoogleAuthAsync()
    {
        var info = await signInManager.GetExternalLoginInfoAsync();
        return await ExternalLoginAsync(info);
    }
    public async Task<Result> GoogleAuthAsync(string providerKey)
    {
        var info = new ExternalLoginInfo(new ClaimsPrincipal(), "Google", providerKey, "Google");
        return await ExternalLoginAsync(info);
    }

    public string? GetUserId(ClaimsPrincipal principal) => userManager.GetUserId(principal);

    public async Task<PagedArrayModel<EmployeeModel>> GetEmployeesAsync(int cateringId, int page, string query)
    {
        var users = await GetUsers<EmployeeModel, Employee>(page, query, x => x.CateringId == cateringId);
        return new PagedArrayModel<EmployeeModel>(users.Items.Select(x => x.User.Adapt<EmployeeModel>()).ToList(), users.TotalCount);
    }

    public async Task<PagedArrayModel<LockableUserModel<ServiceModel>>> GetServicesAsync(int page, string query, string? country)
    {
        Expression<Func<Service, bool>>? predicate = country is null ? null : x => x.Country == country;
        return await GetUsers<ServiceModel, Service>(page, query, predicate);
    }

    public async Task<PagedArrayModel<LockableUserModel<UserModel>>> GetCustomersAsync(int page, string query) =>
        await GetUsers<UserModel, Customer>(page, query);

    public async Task<Result> BlockUserAsync(string id) => await SetLockoutDate(id, DateTimeOffset.MaxValue);

    public async Task<Result> UnblockUserAsync(string id) => await SetLockoutDate(id, null);

    private async Task<Result> ExternalLoginAsync(ExternalLoginInfo? info, string? email = null, string? firstName = null, string? lastName = null)
    {
        if (info is null)
            return Result.Fail(string.Empty);
        var signInResult = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, true);
        email ??= info.Principal.FindFirstValue(ClaimTypes.Email);
        firstName ??= info.Principal.FindFirstValue(ClaimTypes.GivenName) ?? info.Principal.FindFirstValue(ClaimTypes.Name);
        lastName ??= info.Principal.FindFirstValue(ClaimTypes.Surname);
        if (signInResult.Succeeded)
            return Result.Fail(string.Empty);
        if (email is null)
            return Result.Fail(string.Empty);
        var user = await userManager.FindByEmailAsync(email);
        if (user is not null)
        {
            var result = await userManager.AddLoginAsync(user, info);
            if (result.Succeeded)
                await signInManager.SignInAsync(user, true);
            return HandleIdentityResult(result);
        }
        else
        {
            var customer = new Customer
            {
                UserName = email,
                Email = email,
                Name = $"{firstName} {lastName}",
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(customer);
            await userManager.AddToRoleAsync(customer, Roles.Customer);
            if (!result.Succeeded) return Fail(result);
            result = await userManager.AddLoginAsync(customer, info);
            if (result.Succeeded)
                await signInManager.SignInAsync(customer, true);
            return HandleIdentityResult(result);
        }
    }
    private static async Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, AdminOptions configuration)
    {
        var adminEmail = configuration.Email;
        var adminPassword = configuration.Password;
        await AddRole(roleManager, Roles.Admin);
        await AddRole(roleManager, Roles.Customer);
        await AddRole(roleManager, Roles.Employee);
        await AddRole(roleManager, Roles.Service);
        var user = await userManager.FindByEmailAsync(adminEmail);
        if (user is not null) return;
        var admin = new User
        {
            Email = adminEmail,
            UserName = adminEmail,
            Name = Roles.Admin
        };
        var result = await userManager.CreateAsync(admin, adminPassword);
        if (!result.Succeeded) return;
        var token = await userManager.GenerateEmailConfirmationTokenAsync(admin);
        await userManager.ConfirmEmailAsync(admin, token);
        await userManager.AddToRoleAsync(admin, Roles.Admin);
    }
    private static async Task AddRole(RoleManager<IdentityRole> roleManager, string role)
    {
        if (await roleManager.FindByNameAsync(role) is null)
            await roleManager.CreateAsync(new IdentityRole(role));
    }

    private async Task<PagedArrayModel<LockableUserModel<TModel>>> GetUsers<TModel, TEntity>(int page, string query, Expression<Func<TEntity, bool>>? predicate = null)
        where TModel : UserModel
        where TEntity : User
    {
        var users = context.Set<TEntity>().Where(x => x.Name.Contains(query));
        if (predicate is not null)
            users = users.Where(predicate);
        var entities = await users.OrderByDescending(x => x.Name)
            .Skip((page - 1) * ItemsPerPage)
            .Take(ItemsPerPage)
            .Select(x => new { User = x, IsLocked = x.LockoutEnd != null })
            .ToListAsync();
        var models = entities.Adapt<List<LockableUserModel<TModel>>>();

        return new PagedArrayModel<LockableUserModel<TModel>>(models, users.Count());
    }

    private async Task<Result> SetLockoutDate(string id, DateTimeOffset? lockoutEnd)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            return Result.Fail(Errors.NotFound);
        var result = await userManager.SetLockoutEndDateAsync(user, lockoutEnd);
        return HandleIdentityResult(result);
    }
}
