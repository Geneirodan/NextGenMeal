namespace Services.Options;

public class EmailOptions
{
    public const string Section = "EmailConfiguration";
    public string From { get; init; } = null!;
    public string SmtpServer { get; init; } = null!;
    public int Port { get; init; }
    public string Username { get; init; } = null!;
    public string Password { get; init; } = null!;
}
