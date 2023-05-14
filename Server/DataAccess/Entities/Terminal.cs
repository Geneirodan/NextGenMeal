namespace DataAccess.Entities
{
    public class Terminal : Entity
    {
        public string SerialNumber { get; set; } = null!;
        public int Cells { get; set; }
        public virtual Catering Catering { get; set;} = null!;

        public override string? GetOwnerId() => Catering?.GetOwnerId();
    }
}
