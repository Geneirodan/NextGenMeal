namespace Services.Models
{
    public class DishModel : EntityModel
    {
        public decimal Price { get; set; }
        public decimal Portion { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Type { get; set; } = null!;
        public int CateringId { get; set; }
    }
}
