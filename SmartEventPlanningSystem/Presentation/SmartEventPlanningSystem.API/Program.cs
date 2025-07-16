using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Persistence.Configurations;
using SmartEventPlanningSystem.Persistence.DbContext;
using SmartEventPlanningSystem.Persistence.ServiceExtensions;
using SmartEventPlanningSystem.Application.ServiceExtensions;

var builder = WebApplication.CreateBuilder(args);

//Service Extensions
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddApplicationServices();



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
        policy => policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://frontend:80")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


var provider = builder.Services.BuildServiceProvider();
