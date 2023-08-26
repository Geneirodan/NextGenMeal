namespace Services.Interfaces;

public interface IEmailSender
{
    public Task SendEmailAsync(string email, EmailTemplate template, params object?[] parameters);
    public record struct EmailTemplate(string Subject, string Filename);
}
