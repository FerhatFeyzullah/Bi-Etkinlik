using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using SmartEventPlanningSystem.Application.Mapping;
using AutoMapper;



namespace SmartEventPlanningSystem.Application.ServiceExtensions
{
    public static class ApplicationService
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(assembly));
            services.AddAutoMapper(assembly);

        }
    }
}
