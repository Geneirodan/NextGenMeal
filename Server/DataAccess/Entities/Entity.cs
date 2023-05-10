namespace DataAccess.Entities
{
    public abstract class Entity : IOwnedEntity
    {
        public int Id { get; set; }

        public abstract string? GetOwnerId();
    }
}
