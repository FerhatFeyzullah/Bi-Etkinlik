using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartEventPlanningSystem.Application.ServiceExtensions;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Infrastructure.Hubs;
using SmartEventPlanningSystem.Infrastructure.ServiceExtensions;
using SmartEventPlanningSystem.Persistence.Configurations;
using SmartEventPlanningSystem.Persistence.DbContext;
using SmartEventPlanningSystem.Persistence.ServiceExtensions;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//Service Extensions
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();



//Identity DB
builder.Services.AddDbContext<SEP_DbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});

builder.Services.AddIdentityCore<AppUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
})
.AddRoles<AppRole>()
.AddEntityFrameworkStores<SEP_DbContext>()
.AddDefaultTokenProviders();


//JWT
var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<JwtTokenOptions>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = builder.Environment.IsDevelopment() ? false : true;
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.Request.Cookies.ContainsKey("MyAuthCookie"))
            {
                context.Token = context.Request.Cookies["MyAuthCookie"];
                Console.WriteLine($"Token from MyAuthCookie: {context.Token}");
            }
            else
            {
                Console.WriteLine("MyAuthCookie not found in request.");
            }
            return Task.CompletedTask;
        }
    };
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = tokenOptions.Issuer,
        ValidAudience = tokenOptions.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.Key)),
        ClockSkew = TimeSpan.Zero,
        NameClaimType = ClaimTypes.NameIdentifier
    };
});


//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://frontend:80", "http://frontend:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});

// Mobil icin 
builder.WebHost.UseUrls("http://0.0.0.0:5112");



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<SEP_DbContext>();
    context.Database.Migrate(); // Start Migration
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//var disableHttpsRedirect = Environment.GetEnvironmentVariable("DISABLE_HTTPS_REDIRECT");
//if (string.IsNullOrWhiteSpace(disableHttpsRedirect) || !disableHttpsRedirect.Equals("true", StringComparison.OrdinalIgnoreCase))
//{
//    app.UseHttpsRedirection();
//}
//app.UseCors("AllowFrontend");

app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();
app.MapHub<ChatHub>("chat");

app.Run();


var provider = builder.Services.BuildServiceProvider();
