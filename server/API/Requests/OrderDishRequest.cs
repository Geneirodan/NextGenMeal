namespace API.Requests;

public class OrderDishRequest : IRequestBody
{
    public int Quantity { get; set; }
    public int DishId { get; set; }
}
