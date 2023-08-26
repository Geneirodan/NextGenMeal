namespace Services.Models;

public class OrderDishModel
{
    public int Quantity { get; init; }
    public int DishId { get; init; }
    public DishModel Dish { get; init; } = null!;
    public int OrderId { get; init; }
}
