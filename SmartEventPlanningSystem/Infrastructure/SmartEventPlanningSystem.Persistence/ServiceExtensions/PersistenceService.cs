using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartEventPlanningSystem.Application.Repositories;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Persistence.Configurations;
using SmartEventPlanningSystem.Persistence.Repositories;
using SmartEventPlanningSystem.Persistence.Services;
using SmartEventPlanningSystem.Persistence.UnitOfWorks;

namespace SmartEventPlanningSystem.Persistence.ServiceExtensions
{
    public static class PersistenceService
    {
        public static void AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMemoryCache();

            services.AddScoped<IJwtService, JwtService>();
            services.Configure<JwtTokenOptions>(configuration.GetSection("TokenOptions"));


            services.AddScoped(typeof(IReadRepository<>), typeof(ReadRepository<>));
            services.AddScoped(typeof(IWriteRepository<>), typeof(WriteRepository<>));

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IForgotPasswordService, ForgotPasswordService>();
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IEventRegisterService, EventRegisterService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IUserSettingService, UserSettingService>();
        }
    }
}
