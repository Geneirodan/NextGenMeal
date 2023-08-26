namespace DataAccess.Entities.Users;

public class Employee : User, IOwnedEntity
{
    public int CateringId { get; set; }
    public virtual Catering Catering { get; set; } = null!;
    public string GetOwnerId() => Catering.GetOwnerId();
}
