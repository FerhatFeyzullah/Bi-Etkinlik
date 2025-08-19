using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedAwaiting
{
    public class GetEventsICreatedAwaitingRequest : IRequest<GetEventsICreatedAwaitingResponse>
    {
        public int AppUserId { get; set; }
    }
}
