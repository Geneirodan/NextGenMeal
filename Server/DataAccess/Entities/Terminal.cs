namespace DataAccess.Entities
{
    public class Terminal : Entity
    {
        public string SerialNumber { get; set; } = null!;
        public virtual List<Box> Boxes { get; set; } = null!;
        public virtual Catering Catering { get; set;} = null!;

        public override string? GetOwnerId() => Catering?.GetOwnerId();
    }
}
