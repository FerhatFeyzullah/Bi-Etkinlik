using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered
{
    public class GetEventsICreatedUnFilteredRequest : IRequest<GetEventsICreatedUnFilteredResponse>
    {
        public int AppUserId { get; set; }
    }
}
