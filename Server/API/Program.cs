using DataAccess;
using DataAccess.Entities.Users;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.CRUD;
using Services.Interfaces;
using Services.Interfaces.CRUD;
using Services.Logging;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;
var logging = builder.Logging;

// Add file logging
var currentDirectory = Directory.GetCurrentDirectory();
var logfile = "main.log";
var path = Path.Combine(currentDirectory, logfile);
var provider = new FileLoggerProvider(path);
logging.AddProvider(provider);

// Add various services

var connectionString = configuration.GetConnectionString("DefaultConnection");
services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

Action<IdentityOptions> setupAction = options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.SignIn.RequireConfirmedEmail = true;
};
services.AddIdentity<User, IdentityRole>(setupAction)
        .AddEntityFrameworkStores<ApplicationContext>()
        .AddDefaultTokenProviders();

Action<GoogleOptions> googleConfig = options =>
{
    options.ClientId = configuration["Authentication:Google:ClientId"]!;
    options.ClientSecret = configuration["Authentication:Google:ClientSecret"]!;
    options.SaveTokens = true;
    options.SignInScheme = IdentityConstants.ExternalScheme;
};
services.AddAuthentication()
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddGoogle(GoogleDefaults.AuthenticationScheme, googleConfig);

services.ConfigureApplicationCookie(options =>
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
});
services.AddEndpointsApiExplorer()
        .AddSwaggerGen()
        .AddTransient<IEmailSender, EmailSender>()
        .AddScoped<IUserService, UserService>()
        .AddScoped<IDishService, DishService>()
        .AddScoped<ICateringService, CateringService>()
        .AddScoped<IOrderService, OrderService>()
        .AddScoped<ITerminalService, TerminalService>()
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
   .UseHttpsRedirection()
   .UseCors(builder => builder.WithOrigins("https://localhost:3000")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials())
   .UseAuthentication()
   .UseAuthorization();

app.MapControllers();

app.Run();

