using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusFalse
{
    public class GetEventsStatusFalseResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }

    }
}
