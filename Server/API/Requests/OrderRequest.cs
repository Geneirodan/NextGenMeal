using Services.Models;
using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class OrderRequest : IRequestBody
    {
        [Required, DataType(DataType.DateTime)]
        public DateTime Time { get; set; }
        public bool IsBox { get; set; } = false;
        [Required]
        public int CateringId { get; set; }
        public List<OrderDishRequest> OrderDishes { get; set; } = null!;
    }
}
