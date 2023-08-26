using Services.Models.Register;
using System.ComponentModel.DataAnnotations;

namespace API.Requests.Account.Register;

public class ServiceRegisterRequest : RegisterRequest
{
    [Required]
    public string Country { get; init; } = null!;
    public override ServiceRegisterModel CreateModel() => CreateModel<ServiceRegisterModel>();
}
