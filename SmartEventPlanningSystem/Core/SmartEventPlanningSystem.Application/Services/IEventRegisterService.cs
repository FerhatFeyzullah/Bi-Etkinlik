using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IEventRegisterService
    {
        Task RegisterEvent(int eventId, int userId, CancellationToken ct);
        Task DeleteEventRegister(int eventId, int userId, CancellationToken ct);
        Task<GetEventsI_JoinedResponse> GetEventsI_Joined(int id, CancellationToken ct);

    }
}
