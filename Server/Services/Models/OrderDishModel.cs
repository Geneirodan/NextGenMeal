namespace Services.Models
{
    public class OrderDishModel
    {
        public int Quantity { get; set; }

        public int DishId { get; set; }
        public int OrderId { get; set; }
    }
}
