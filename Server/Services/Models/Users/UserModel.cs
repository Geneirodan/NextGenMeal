using DataAccess.Entities.Users;

namespace Services.Models.Users
{
    public class UserModel
    {
        public string Id { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
    }
}
