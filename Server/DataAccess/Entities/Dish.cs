namespace DataAccess.Entities
{
    public class Dish : Entity
    {
        public decimal Price { get; set; }
        public decimal Portion { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Type { get; set; } = null!;

        public int CateringId { get; set; }
        public virtual Catering Catering { get; set; } = null!;

        public virtual List<OrderDish> OrderDishes { get; set; } = null!;

        public override string? GetOwnerId() => Catering?.GetOwnerId();
    }
}
