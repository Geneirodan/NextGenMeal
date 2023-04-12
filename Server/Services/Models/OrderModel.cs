namespace Services.Models
{
    public class OrderModel : EntityModel
    {
        public decimal Price { get; set; }
        public string Status { get; set; } = null!;
        public DateTime Time { get; set; }
        public bool IsBox { get; set; }

        public string UserId { get; set; } = null!;
        public int CateringId { get; set; }
        public List<OrderDishModel> OrderDishes { get; set; } = null!;
    }
}
