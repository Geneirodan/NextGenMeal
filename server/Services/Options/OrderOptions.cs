namespace Services.Options;

public class OrderOptions
{
        public const string Section = "Mqtt";
        public int DeleteTimeout { get; init; }
        public List<string> DishTypes { get; init; } = null!;
}
