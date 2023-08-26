using Mapster;
using Services.Constants;
using Services.Models.Register;
using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account.Register;

public abstract class RegisterRequest
{
    [Required]
    public string Name { get; init; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; init; } = null!;

    [Required]
    [DataType(DataType.Password)]
    [Compare(nameof(Password), ErrorMessage = Errors.PasswordAreNotTheSame)]
    public string ConfirmPassword { get; set; } = null!;
    protected T CreateModel<T>() => this.Adapt<T>();
    public abstract RegisterModel CreateModel();
}
