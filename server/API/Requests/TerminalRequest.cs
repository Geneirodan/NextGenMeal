using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class TerminalRequest : IRequestBody
{
    [Required]
    public string SerialNumber { get; set; } = null!;
    [Required]
    public int Id { get; set; }
    [Required]
    public int CellCount { get; set; }
}
