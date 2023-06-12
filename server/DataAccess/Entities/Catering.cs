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
        public virtual Service Service { get; set; } = null!;

        public virtual List<Employee> Employees { get; set; } = null!;
        public virtual List<Dish> Dishes { get; set; } = null!;
        public virtual List<Order> Orders { get; set; } = null!;

        public virtual Terminal Terminal { get; set; } = null!;

        public override string GetOwnerId() => ServiceId;
    }
}
