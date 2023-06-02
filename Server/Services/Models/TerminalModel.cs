namespace Services.Models
{
    public class TerminalModel : EntityModel
    {
        private int cellCount = 0;

        public string SerialNumber { get; set; } = null!;
        public int CellCount
        {
            get => cellCount == 0 ? Cells?.Length ?? 0 : cellCount;
            set => cellCount = value;
        }
        public string[] Cells { get; set; } = null!;
    }
}
