namespace Services.Models
{
    public class OrderDishModel
    {
        public int Quantity { get; set; }

        public int DishId { get; set; }
        public DishModel Dish { get; set; } = null!;
        public int OrderId { get; set; }
    }
}
