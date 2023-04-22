namespace Services.Models
{
    public class TerminalModel : EntityModel
    {
        public string SerialNumber { get; set; } = null!;
        public List<BoxModel> Boxes { get; set; } = null!;
    }
}
