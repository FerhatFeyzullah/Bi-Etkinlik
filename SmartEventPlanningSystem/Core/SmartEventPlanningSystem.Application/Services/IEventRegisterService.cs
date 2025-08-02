using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IEventRegisterService
    {
        Task RegisterEvent(int eventId, int userId, CancellationToken ct);
        Task DeleteEventRegister(int eventId, int userId, CancellationToken ct);
        Task<List<GetMyPastEventsResponse>> GetMyPastEvents(int id, CancellationToken ct);
        Task<List<GetMyCurrentEventsResponse>> GetMyCurrentEvents(int id, CancellationToken ct);
        Task<List<GetMyFutureEventsResponse>> GetMyFutureEvents(int id, CancellationToken ct);

    }
}
