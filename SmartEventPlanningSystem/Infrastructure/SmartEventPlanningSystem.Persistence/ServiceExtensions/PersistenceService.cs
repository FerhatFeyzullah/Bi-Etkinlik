using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartEventPlanningSystem.Application.Repositories;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;
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
            

            services.AddScoped(typeof(IReadRepository<>),typeof(ReadRepository<>));
            services.AddScoped(typeof(IWriteRepository<>),typeof(WriteRepository<>));

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IForgotPasswordService, ForgotPasswordService>();
        }
    }
}
