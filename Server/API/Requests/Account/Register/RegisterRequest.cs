using Mapster;
using Services.Models.Register;
using Settings.Constants;
using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account.Register
{
    public abstract class RegisterRequest
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required, DataType(DataType.Password)]
        public string Password { get; set; } = null!;

        [Required, DataType(DataType.Password), Compare(nameof(Password), ErrorMessage = Errors.PasswordAreNotTheSame)]
        public string ConfirmPassword { get; set; } = null!;
        protected T CreateModel<T>() => this.Adapt<T>();
        public abstract RegisterModel CreateModel();
    }
}
