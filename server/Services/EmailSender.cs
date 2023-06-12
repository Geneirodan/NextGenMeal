using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using Services.Interfaces;
using static Services.Interfaces.IEmailSender;

namespace Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration configuration;
        private readonly ILogger<EmailSender> logger;
        public EmailSender(IConfiguration configuration, ILogger<EmailSender> logger)
        {
            this.configuration = configuration;
            this.logger = logger;
        }
        public async Task SendEmailAsync(string email, EmailTemplate template, params object?[] parameters)
        {
            foreach (var parameter in parameters)
                logger.LogInformation("Parameter: {0}", parameter);
            try
            {
                BodyBuilder builder = new() { HtmlBody = string.Format(await File.ReadAllTextAsync($"Templates\\{template.Filename}.html"), parameters) };
                var emailMessage = new MimeMessage
                {
                    Subject = template.Subject,
                    Body = builder.ToMessageBody()
                };
                emailMessage.From.Add(new MailboxAddress(configuration["EmailConfiguration:UserName"], configuration["EmailConfiguration:From"]));
                emailMessage.To.Add(new MailboxAddress(string.Empty, email));

                using var client = new SmtpClient();
                await client.ConnectAsync(configuration["EmailConfiguration:SmtpServer"],
                                            int.Parse(configuration["EmailConfiguration:Port"]!),
                                            useSsl: true);
                await client.AuthenticateAsync(configuration["EmailConfiguration:From"],
                    configuration["EmailConfiguration:Password"]);
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
}
