using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusNull
{
    public class GetEventsStatusNullHandler(IEventService eventService) : IRequestHandler<GetEventsStatusNullRequest, GetEventsStatusNullResponse>
    {
        public async Task<GetEventsStatusNullResponse> Handle(GetEventsStatusNullRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsStatusNull(cancellationToken);
        }
    }
}
