namespace Services.Models;

public class TerminalModel : EntityModel
{
    private int cellCount;
    public int CellCount
    {
        get => cellCount == 0 ? Cells.Length : cellCount;
        set => cellCount = value;
    }
    public string SerialNumber { get; init; } = null!;
    public string[] Cells { get; set; } = null!;
}
