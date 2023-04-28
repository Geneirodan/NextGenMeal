namespace DataAccess.Entities
{
    public abstract class Entity
    {
        public int Id { get; set; }

        public abstract string? GetOwnerId();
    }
}
