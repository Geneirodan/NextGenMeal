namespace Services.Models;

public class OrderModel : EntityModel
{
    public decimal Price { get; init; }
    public string Status { get; set; } = null!;
    public DateTime Time { get; init; }
    public bool IsBox { get; init; }
    public string? CustomerId { get; init; }
    public int CateringId { get; init; }
    public CateringModel Catering { get; init; } = null!;
    public List<OrderDishModel> OrderDishes { get; init; } = null!;
}
