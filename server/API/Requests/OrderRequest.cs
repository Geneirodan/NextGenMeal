using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class OrderRequest : IRequestBody
{
    [Required]
    [DataType(DataType.DateTime)]
    public DateTime Time { get; set; }
    [Required]
    public bool? IsBox { get; set; } = null!;
    [Required]
    public int CateringId { get; set; }
    [Required]
    public List<OrderDishRequest> OrderDishes { get; set; } = null!;
}
