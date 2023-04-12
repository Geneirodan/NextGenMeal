namespace DataAccess.Entities.Users
{
    public class Service : User
    {
        public string Country { get; set; } = null!;
        public List<Catering> Caterings { get; set; } = null!;
    }
}
