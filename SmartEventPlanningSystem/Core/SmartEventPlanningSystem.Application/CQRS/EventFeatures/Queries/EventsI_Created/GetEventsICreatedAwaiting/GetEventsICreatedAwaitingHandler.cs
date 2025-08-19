using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedAwaiting
{
    public class GetEventsICreatedAwaitingHandler(IEventService eventService) : IRequestHandler<GetEventsICreatedAwaitingRequest, GetEventsICreatedAwaitingResponse>
    {
        public async Task<GetEventsICreatedAwaitingResponse> Handle(GetEventsICreatedAwaitingRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsI_CreatedAwaiting(request.AppUserId, cancellationToken);
        }
    }
}
