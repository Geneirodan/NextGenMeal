namespace Services.Models.Users
{
    public class LockableUserModel<TModel> where TModel : UserModel
    {
        public TModel User { get; set; } = null!;
        public bool IsLocked { get; set; }
    }
}
