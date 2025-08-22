using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusTrue
{
    public class GetEventsStatusTrueHandler(IEventService eventService) : IRequestHandler<GetEventsStatusTrueRequest, GetEventsStatusTrueResponse>
    {
        public async Task<GetEventsStatusTrueResponse> Handle(GetEventsStatusTrueRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsStatusTrue(cancellationToken);
        }
    }
}
