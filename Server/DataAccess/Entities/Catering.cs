using DataAccess.Entities.Users;

namespace DataAccess.Entities
{
    public class Catering : Entity
    {
        public string Name { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;

        public string ServiceId { get; set; } = null!;
        public Service Service { get; set; } = null!;

        public List<Employee> Employees { get; set; } = null!;
        public List<Dish> Dishes { get; set; } = null!;
        public List<Order> Orders { get; set; } = null!;

        public int TerminalId { get; set; }
        public Terminal Terminal { get; set; } = null!;
    }
}
