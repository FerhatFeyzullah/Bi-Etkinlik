using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedForArchive
{
    public class GetEventsICreatedForArchiveRequest : IRequest<GetEventsICreatedForArchiveResponse>
    {
        public int AppUserId { get; set; }

    }
}
