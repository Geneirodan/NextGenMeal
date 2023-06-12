namespace Services.Models
{
    public class TerminalModel : EntityModel
    {
        private int cellCount;

        public string SerialNumber { get; set; } = null!;
        public int CellCount
        {
            get => cellCount == 0 ? Cells.Length : cellCount;
            set => cellCount = value;
        }
        public string[] Cells { get; set; } = null!;
    }
}
