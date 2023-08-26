using Services.Constants;
using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account;

public class ResetPasswordRequest
{
    [EmailAddress]
    [Required]
    public string Email { get; init; } = null!;

    [DataType(DataType.Password)]
    [Required]
    public string Password { get; init; } = null!;

    [DataType(DataType.Password)]
    [Required]
    [Compare(nameof(Password), ErrorMessage = Errors.PasswordAreNotTheSame)]
    public string ConfirmPassword { get; init; } = null!;

    [Required]
    public string Code { get; set; } = null!;
}
