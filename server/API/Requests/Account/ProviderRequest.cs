using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account
{
    public class ProviderRequest
    {
        [Required]
        public string ProviderKey { get; set; } = null!;
        [Required]
        public string Token { get; set; } = null!;
    }
}
