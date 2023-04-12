namespace DataAccess.Entities
{
    public class Box : Entity
    {
        public decimal Price { get; set; }
        public string Description { get; set; } = null!;
        public int TerminalId { get; set; }
        public Terminal Terminal { get; set; } = null!;
    }
}
