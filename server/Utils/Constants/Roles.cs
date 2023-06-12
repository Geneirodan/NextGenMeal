namespace Utils.Constants
{
    public static class Roles
    {
        public const string Admin = nameof(Admin);
        public const string Customer = nameof(Customer);
        public const string Service = nameof(Service);
        public const string Employee = nameof(Employee);
        public const string CUSTOMER_SERVICE = $"{Customer},{Service}";
        public const string CUSTOMER_EMPLOYEE = $"{Customer},{Employee}";
    }
}
