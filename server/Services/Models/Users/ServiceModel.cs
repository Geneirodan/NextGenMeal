using DataAccess.Entities.Users;

namespace Services.Models.Users
{
    public class ServiceModel : UserModel
    {
        public string Country { get; set; } = null!;
    }
}
