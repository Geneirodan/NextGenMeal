using static Services.Interfaces.IEmailSender;

namespace Services;

public static class EmailTemplates
{
    public static EmailTemplate Register => new("Confirm your email", "Register");
    public static EmailTemplate ForgotPassword => new("Password reset", "Forgot");
}
