using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using Services.Interfaces;
using Services.Options;
using static Services.Interfaces.IEmailSender;

namespace Services;

public class EmailSender : IEmailSender
{
    private readonly ILogger<EmailSender> logger;
    private readonly EmailOptions options;
    public EmailSender(ILogger<EmailSender> logger, IOptions<EmailOptions> options)
    {
        this.logger = logger;
        this.options = options.Value;
    }
    public async Task SendEmailAsync(string email, EmailTemplate template, params object?[] parameters)
    {
        foreach (var parameter in parameters)
            logger.LogInformation("Parameter: {parameter}", parameter);
        try
        {
            BodyBuilder builder = new() { HtmlBody = string.Format(await File.ReadAllTextAsync($"Templates\\{template.Filename}.html"), parameters) };
            var emailMessage = new MimeMessage
            {
                Subject = template.Subject,
                Body = builder.ToMessageBody()
            };
            emailMessage.From.Add(new MailboxAddress(options.Username, options.From));
            emailMessage.To.Add(new MailboxAddress(string.Empty, email));

            using var client = new SmtpClient();
            await client.ConnectAsync(options.SmtpServer, options.Port, true);
            await client.AuthenticateAsync(options.From, options.Password);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
            logger.LogInformation("File '{file}' was sent on {email}", template.Filename, email);
        }
        catch (Exception ex)
        {
            logger.LogError("{Message}", ex.Message);
        }
    }
}
