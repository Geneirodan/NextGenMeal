using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class DishType
{
    [Key]
    public string Name { get; set; } = null!;
    public virtual List<Dish> Dishes { get; set; } = null!;
}
