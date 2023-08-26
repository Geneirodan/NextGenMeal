using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class CateringRequest : IRequestBody
{
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Street { get; set; } = null!;
    [Required]
    public string City { get; set; } = null!;
    [Required]
    public string State { get; set; } = null!;
}
