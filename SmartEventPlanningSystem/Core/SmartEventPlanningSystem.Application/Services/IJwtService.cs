using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IJwtService
    {
        Task<string> CreateTokenAsync(AppUser user);
    }
}
