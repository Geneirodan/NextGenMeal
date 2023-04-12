namespace DataAccess.Entities.Users
{
    public class Employee : User
    {
        public int CateringId { get; set; }
        public Catering Catering { get; set; } = null!;
    }
}
