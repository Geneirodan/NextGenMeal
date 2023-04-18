using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class DishRequest : IRequestBody
    {
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Portion { get; set; }
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public List<string> Tags { get; set; } = null!;
        [Required]
        public int CateringId { get; set; }
    }
}
