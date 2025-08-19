using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusTrue
{
    public class GetEventsICreatedStatusTrueResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }

    }
}
