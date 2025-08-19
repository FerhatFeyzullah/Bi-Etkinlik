using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered
{
    public class GetEventsICreatedUnFilteredHandler(IEventService eventService) : IRequestHandler<GetEventsICreatedUnFilteredRequest, GetEventsICreatedUnFilteredResponse>
    {
        public async Task<GetEventsICreatedUnFilteredResponse> Handle(GetEventsICreatedUnFilteredRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsI_CreatedUnFiltered(request.AppUserId, cancellationToken);
        }
    }
}
