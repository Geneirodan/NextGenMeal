using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class ApplicationContext : IdentityDbContext<User>
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; } = null!;
    public DbSet<Employee> Employees { get; set; } = null!;
    public DbSet<Service> Services { get; set; } = null!;
    public DbSet<Catering> Caterings { get; set; } = null!;
    public DbSet<Dish> Dishes { get; set; } = null!;
    public DbSet<DishType> DishTypes { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderDish> OrderDishes { get; set; } = null!;
    public DbSet<Terminal> Terminals { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseLazyLoadingProxies();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>()
            .UseTptMappingStrategy();

        builder.Entity<Terminal>()
            .HasKey(t => t.Id);

        builder.Entity<Terminal>()
            .Property(t => t.Id)
            .ValueGeneratedNever();

        builder.Entity<Catering>()
            .HasOne(x => x.Terminal)
            .WithOne(x => x.Catering)
            .HasForeignKey<Catering>(x => x.Id);
        
        builder.Entity<OrderDish>()
            .HasKey(od => new { od.OrderId, od.DishId });

        builder.Entity<Dish>()
            .HasOne(x => x.DishType)
            .WithMany(x => x.Dishes)
            .HasForeignKey(x => x.Type)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.Entity<Terminal>()
            .Property(t => t.Cells)
            .HasConversion(c => string.Join('|', c),
                c => c.Split('|', StringSplitOptions.None));

        base.OnModelCreating(builder);
    }
}
