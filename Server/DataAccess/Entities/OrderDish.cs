namespace DataAccess.Entities
{
    public class OrderDish
    {
        public int Quantity { get; set; }
        public int DishId { get; set; }
        public Dish Dish { get; set; } = null!;
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
    }
}
