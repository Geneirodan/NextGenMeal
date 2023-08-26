using Services.Constants;
using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account;

public class AddPasswordRequest
{

    [DataType(DataType.Password)]
    [Required]
    public string NewPassword { get; init; } = null!;

    [DataType(DataType.Password)]
    [Required]
    [Compare(nameof(NewPassword), ErrorMessage = Errors.PasswordAreNotTheSame)]
    public string ConfirmNewPassword { get; init; } = null!;
}
