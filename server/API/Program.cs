using API.Extensions;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Services.Logging;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add file logging
var currentDirectory = Directory.GetCurrentDirectory();
var path = Path.Combine(currentDirectory, "main.log");
var provider = new FileLoggerProvider(path);
builder.Logging.AddProvider(provider);

var connectionString = builder.Configuration.GetConnectionString("PostgreSQL");
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services
    .AddDbContext<ApplicationContext>(options => options.UseNpgsql(connectionString))
    .AddServicesOptions(builder.Configuration)
    .AddMqttClient()
    .AddIdentity()
    .AddAuth()
    .ConfigureApplicationCookie(options =>
    {
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
        options.Cookie.SameSite = SameSiteMode.None;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    })
    .AddEndpointsApiExplorer()
    .AddSwaggerGen()
    .AddBusinessLogicServices()
    .AddProblemDetails()
    .AddControllersWithViews()
    .AddNewtonsoftJson();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler()
//   .UseHttpsRedirection()
    .UseCors(corsPolicyBuilder => corsPolicyBuilder.WithOrigins("https://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials())
    .UseAuthentication()
    .UseAuthorization();

app.MapControllers();

app.MapGet("/api/languages",
    () => CultureInfo.GetCultures(CultureTypes.SpecificCultures)
        .Select(cult => new RegionInfo(cult.Name).EnglishName)
        .Distinct()
        .OrderBy(q => q)
        .ToList());

app.Run();
