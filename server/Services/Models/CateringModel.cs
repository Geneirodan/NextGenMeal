namespace Services.Models;

public class CateringModel : EntityModel
{
    public string Name { get; init; } = null!;
    public string Street { get; init; } = null!;
    public string City { get; init; } = null!;
    public string State { get; init; } = null!;
    public string ServiceId { get; init; } = null!;
    public TerminalModel? Terminal { get; init; }
}
