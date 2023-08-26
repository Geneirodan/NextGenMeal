namespace DataAccess.Entities.Users;

public class Service : User
{
    public string Country { get; set; } = null!;
    public virtual List<Catering> Caterings { get; set; } = null!;
}
