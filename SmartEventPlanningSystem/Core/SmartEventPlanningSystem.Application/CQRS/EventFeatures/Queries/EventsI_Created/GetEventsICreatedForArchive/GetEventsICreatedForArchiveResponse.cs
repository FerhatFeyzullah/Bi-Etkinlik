using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedForArchive
{
    public class GetEventsICreatedForArchiveResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }
    }
}
