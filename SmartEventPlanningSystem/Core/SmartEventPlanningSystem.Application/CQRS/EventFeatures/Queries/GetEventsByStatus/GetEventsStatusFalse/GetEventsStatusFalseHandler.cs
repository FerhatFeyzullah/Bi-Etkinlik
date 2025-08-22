using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusFalse
{
    public class GetEventsStatusFalseHandler(IEventService eventService) : IRequestHandler<GetEventsStatusFalseRequest, GetEventsStatusFalseResponse>
    {
        public async Task<GetEventsStatusFalseResponse> Handle(GetEventsStatusFalseRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsStatusFalse(cancellationToken);
        }
    }
}
