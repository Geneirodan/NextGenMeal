using Microsoft.EntityFrameworkCore;

namespace DataAccess.Entities
{
    public class Box : Entity
    {
        public string Name { get; set; } = null!;
        [Precision(18, 2)]
        public decimal Price { get; set; }
        public string Description { get; set; } = null!;
        public int TerminalId { get; set; }
        public virtual Terminal Terminal { get; set; } = null!;

        public override string? GetOwnerId() => Terminal?.GetOwnerId();
    }
}
