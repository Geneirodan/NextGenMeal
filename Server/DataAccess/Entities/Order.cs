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
        public virtual Customer Customer { get; set; } = null!;

        public int CateringId { get; set; }
        public virtual Catering Catering { get; set; } = null!;

        public virtual List<OrderDish> OrderDishes { get; set; } = null!;

        public override string GetOwnerId()
        {
            return CustomerId;
        }
    }
}
