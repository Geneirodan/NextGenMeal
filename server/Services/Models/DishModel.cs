namespace Services.Models;

public class DishModel : EntityModel
{
    public decimal Price { get; init; }
    public decimal Portion { get; init; }
    public string Name { get; init; } = null!;
    public string Description { get; init; } = null!;
    public string Type { get; init; } = null!;
    public int CateringId { get; init; }
}
