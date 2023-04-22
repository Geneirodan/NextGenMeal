namespace Utils.Constants
{
    public static class Roles
    {
        public const string Admin = "Admin";
        public const string Customer = nameof(DataAccess.Entities.Users.Customer);
        public const string Service = nameof(DataAccess.Entities.Users.Service);
        public const string Employee = nameof(DataAccess.Entities.Users.Employee);
        public const string CustomerService = $"{Customer},{Service}";
        public const string CustomerEmployee = $"{Customer},{Employee}";
    }
}
