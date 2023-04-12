namespace DataAccess.Entities
{
    public class Terminal : Entity
    {
        public string SerialNumber { get; set; } = null!;
        public List<Box> Boxes { get; set; } = null!;

        public int CateringId { get; set; }
        public Catering Catering { get; set;} = null!;
    }
}
