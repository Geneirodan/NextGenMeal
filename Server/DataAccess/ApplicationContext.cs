using DataAccess.Entities;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DataAccess
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<Service> Services { get; set; } = null!;
        public DbSet<Catering> Caterings { get; set; } = null!;
        public DbSet<Dish> Dishes { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderDish> OrderDishes { get; set; } = null!;
        public DbSet<Terminal> Terminals { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseLazyLoadingProxies();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                   .UseTptMappingStrategy();

            builder.Entity<User>()
                   .HasData(new User { Id = "0", Name = "Deleted user" });

            //builder.Entity<Customer>()
            //       .HasMany(c => c.Orders)
            //       .WithOne(o => o.Customer)
            //       .HasForeignKey(o => o.CustomerId)
            //       .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Order>()
                   .HasOne(o => o.Customer)
                   .WithMany(c => c.Orders)
                   .HasForeignKey(o => o.CustomerId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Service>()
                   .HasMany(s => s.Caterings)
                   .WithOne(o => o.Service)
                   .HasForeignKey(o => o.ServiceId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Catering>()
                   .HasMany(c => c.Employees)
                   .WithOne(e => e.Catering)
                   .HasForeignKey(e => e.CateringId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Employee>()
                   .HasOne(e => e.Catering)
                   .WithMany(c => c.Employees)
                   .HasForeignKey(e => e.CateringId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Catering>()
                   .HasMany(c => c.Dishes)
                   .WithOne(o => o.Catering)
                   .HasForeignKey(o => o.CateringId)
                   .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Catering>()
                   .HasMany(c => c.Orders)
                   .WithOne(o => o.Catering)
                   .HasForeignKey(o => o.CateringId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Catering>()
                   .HasOne(c => c.Terminal)
                   .WithOne(t => t.Catering)
                   .HasForeignKey<Terminal>(t => t.Id)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Terminal>()
                   .HasKey(t => t.Id);

            builder.Entity<Terminal>()
                   .Property(t => t.Id)
                   .ValueGeneratedNever();

            builder.Entity<Order>()
                   .HasMany(o => o.OrderDishes)
                   .WithOne(od => od.Order)
                   .HasForeignKey(od => od.OrderId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<OrderDish>()
                   .HasKey(od => new { od.OrderId, od.DishId });

            builder.Entity<OrderDish>()
                   .HasOne(od => od.Dish)
                   .WithMany(o => o.OrderDishes)
                   .HasForeignKey(od => od.DishId)
                   .OnDelete(DeleteBehavior.NoAction);

            //builder.Entity<Dish>()
            //       .Property(e => e.Tags)
            //       .HasConversion(v => string.Join('|', v),
            //                      v => v.Split('|', StringSplitOptions.RemoveEmptyEntries).ToList());

            base.OnModelCreating(builder);
        }
    }
}
