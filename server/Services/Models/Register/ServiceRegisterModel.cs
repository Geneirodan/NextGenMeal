using Mapster;
using Services.Constants;

namespace Services.Models.Register;

public class ServiceRegisterModel : RegisterModel
{
    public string Country { get; set; } = null!;
    public override DataAccess.Entities.Users.Service Create() => this.Adapt<DataAccess.Entities.Users.Service>();
    public override string GetRole() => Roles.Service;
}
