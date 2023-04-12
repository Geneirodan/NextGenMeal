namespace Services.Models
{
    public class CateringModel : EntityModel
    {
        public string Name { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;

        public string ServiceId { get; set; } = null!;
        public int TerminalId { get; set; }
    }
}
