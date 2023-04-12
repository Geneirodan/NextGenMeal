namespace Services.Models
{
    public class BoxModel : EntityModel
    {
        public decimal Price { get; set; }
        public string Description { get; set; } = null!;
        public int TerminalId { get; set; }
    }
}
