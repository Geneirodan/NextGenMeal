namespace DataAccess.Entities.Users
{
    public class Employee : User
    {
        public int CateringId { get; set; }
        public virtual Catering Catering { get; set; } = null!;
    }
}
