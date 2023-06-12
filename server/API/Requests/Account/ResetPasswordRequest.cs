using System.ComponentModel.DataAnnotations;
using Utils.Constants;

namespace API.Requests.Account
{
    public class ResetPasswordRequest
    {
        [EmailAddress, Required]
        public string Email { get; set; } = null!;

        [DataType(DataType.Password), Required]
        public string Password { get; init; } = null!;

        [DataType(DataType.Password), Required, Compare(nameof(Password), ErrorMessage = Errors.PASSWORD_ARE_NOT_THE_SAME)]
        public string ConfirmPassword { get; set; } = null!;

        [Required]
        public string Code { get; set; } = null!;
    }
}
