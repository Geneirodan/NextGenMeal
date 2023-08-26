using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account;

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; init; } = null!;

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; init; } = null!;
}
