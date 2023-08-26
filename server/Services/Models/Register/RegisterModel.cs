using DataAccess.Entities.Users;

namespace Services.Models.Register;

public abstract class RegisterModel
{
    public string Name { get; init; } = null!;
    public string Email { get; init; } = null!;
    public string UserName => Email;
    public string Password { get; init; } = null!;
    public abstract User Create();
    public abstract string GetRole();
}
