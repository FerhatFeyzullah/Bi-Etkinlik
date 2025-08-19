using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered
{
    public class GetEventsICreatedUnFilteredResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }
    }
}
