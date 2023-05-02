using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class BoxRequest : IRequestBody
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public int TerminalId { get; set; }
    }
}
