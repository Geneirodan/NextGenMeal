using DataAccess.Entities.Users;
using Mapster;
using Services.Constants;

namespace Services.Models.Register;

public class ServiceRegisterModel : RegisterModel
{
    public string Country { get; set; } = null!;
    public override Service Create() => this.Adapt<Service>();
    public override string GetRole() => Roles.Service;
}
