using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusFalse
{
    public class GetEventsICreatedStatusFalseHandler(IEventService eventService) : IRequestHandler<GetEventsICreatedStatusFalseRequest, GetEventsICreatedStatusFalseResponse>
    {
        public async Task<GetEventsICreatedStatusFalseResponse> Handle(GetEventsICreatedStatusFalseRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsI_CreatedStatusFalse(request.AppUserId, cancellationToken);
        }
    }
}
