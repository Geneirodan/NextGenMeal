namespace DataAccess.Entities
{
    public class Dish : Entity
    {
        public decimal Price { get; set; }
        public int Portion { get; set; }
        public string Description { get; set; } = null!;
        public List<string> Tags { get; set; } = null!;

        public int CateringId { get; set; }
        public Catering Catering { get; set; } = null!;

        public List<OrderDish> OrderDishes { get; set; } = null!;
    }
}
