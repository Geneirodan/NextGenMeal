using DataAccess.Entities.Users;

namespace Services.Models.Users
{
    public class EmployeeModel : UserModel
    {
        public int DepartmentId { get; set; }
    }
}
