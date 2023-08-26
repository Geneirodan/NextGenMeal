using DataAccess;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;
using Services;
using Services.Interfaces;
using Services.Options;

namespace API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMqttClient(this IServiceCollection services)
    {
        var mqttOptions = services.BuildServiceProvider().GetRequiredService<IOptions<MqttOptions>>().Value;
        var options = new MqttClientOptionsBuilder()
            .WithClientId($"{mqttOptions.Prefix}/Server")
            .WithTcpServer(mqttOptions.Broker, mqttOptions.Port)
            .Build();
        var factory = new MqttFactory();
        var client = factory.CreateMqttClient();
        _ = Task.Run(async () =>
        {
            while (true)
            {
                try
                {
                    if (await client.TryPingAsync()) continue;
                    await client.ConnectAsync(options);
                    Console.WriteLine("The MQTT client is connected.");
                }
                catch
                {
                    Console.WriteLine("The MQTT client can't connect.");
                }
                finally
                {
                    await Task.Delay(TimeSpan.FromSeconds(5));
                }
            }
        });
        return services.AddSingleton(client);
    }

    public static IServiceCollection AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.SignIn.RequireConfirmedEmail = true;
            })
            .AddEntityFrameworkStores<ApplicationContext>()
            .AddDefaultTokenProviders();
        return services;
    }

    public static IServiceCollection AddAuth(this IServiceCollection services)
    {
        var googleAuthOptions = services.BuildServiceProvider().GetRequiredService<IOptions<GoogleAuthOptions>>().Value;
        services.AddAuthentication()
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddGoogle(GoogleDefaults.AuthenticationScheme,
                options =>
                {
                    options.ClientId = googleAuthOptions.ClientId;
                    options.ClientSecret = googleAuthOptions.ClientSecret;
                    options.SaveTokens = true;
                    options.SignInScheme = IdentityConstants.ExternalScheme;
                });
        return services;
    }

    public static IServiceCollection AddServicesOptions(this IServiceCollection services, IConfiguration configuration) =>
        services
            .Configure<GoogleAuthOptions>(configuration.GetSection(GoogleAuthOptions.Section))
            .Configure<MqttOptions>(configuration.GetSection(MqttOptions.Section))
            .Configure<EmailOptions>(configuration.GetSection(EmailOptions.Section))
            .Configure<OrderOptions>(configuration.GetSection(OrderOptions.Section))
            .Configure<AdminOptions>(configuration.GetSection(AdminOptions.Section))
            .Configure<PaginationOptions>(configuration.GetSection(PaginationOptions.Section));
   
    public static IServiceCollection AddBusinessLogicServices(this IServiceCollection services) =>
        services
            .AddTransient<IEmailSender, EmailSender>()
            .AddScoped<IUserService, UserService>()
            .AddScoped<IDishService, DishService>()
            .AddScoped<ICateringService, CateringService>()
            .AddScoped<IDishTypeService, DishTypeService>()
            .AddScoped<IOrderService, OrderService>()
            .AddScoped<ITerminalService, TerminalService>();
}
