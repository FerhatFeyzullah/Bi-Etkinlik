using Microsoft.Extensions.DependencyInjection;
using System.Reflection;



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
