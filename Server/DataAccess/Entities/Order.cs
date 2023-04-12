using DataAccess.Entities.Users;
using System.Diagnostics.Contracts;

namespace DataAccess.Entities
{
    public class Order : Entity
    {
        public decimal Price { get; set; }
        public string Status { get; set; } = null!;
        public DateTime Time { get; set; }
        public bool IsBox { get; set; }

        public string CustomerId { get; set; } = null!;
        public Customer Customer { get; set; } = null!;

        public int CateringId { get; set; }
        public Catering Catering { get; set; } = null!;

        public List<OrderDish> OrderDishes { get; set; } = null!;

    }
}
