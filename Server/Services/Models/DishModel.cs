namespace Services.Models
{
    public class DishModel : EntityModel
    {
        public decimal Price { get; set; }
        public int Portion { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public List<string> Tags { get; set; } = null!;
        public int CateringId { get; set; }
    }
}
