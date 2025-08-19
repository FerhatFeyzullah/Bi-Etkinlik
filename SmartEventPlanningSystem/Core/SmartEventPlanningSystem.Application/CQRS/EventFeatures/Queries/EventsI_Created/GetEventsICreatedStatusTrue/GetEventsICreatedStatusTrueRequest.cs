using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusTrue
{
    public class GetEventsICreatedStatusTrueRequest : IRequest<GetEventsICreatedStatusTrueResponse>
    {
        public int AppUserId { get; set; }
    }
}
