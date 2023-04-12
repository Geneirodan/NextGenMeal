using Services.Models;
using System.ComponentModel.DataAnnotations;

namespace API.Requests
{
    public class TerminalRequest : IRequestBody
    {
        [Required]
        public string SerialNumber { get; set; } = null!;
        [Required]
        public int CateringId { get; set; }
    }
}
