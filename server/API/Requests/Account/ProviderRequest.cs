using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account;

public class ProviderRequest
{
    [Required]
    public string ProviderKey { get; init; } = null!;
    [Required]
    public string Token { get; init; } = null!;
}
