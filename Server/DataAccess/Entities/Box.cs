namespace DataAccess.Entities
{
    public class Box : Entity
    {
        public decimal Price { get; set; }
        public string Description { get; set; } = null!;
        public int TerminalId { get; set; }
        public virtual Terminal Terminal { get; set; } = null!;

        public override string GetOwnerId()
        {
            return Terminal.GetOwnerId();
        }
    }
}
