using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using SmartEventPlanningSystem.Infrastructure.Interfaces;
using SmartEventPlanningSystem.Infrastructure.Services;

namespace SmartEventPlanningSystem.Infrastructure.ServiceExtensions
{
    public static class InfrastructureService
    {
        public static void AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IFileStorageService, FileStorageService>();
        }
    }
}
