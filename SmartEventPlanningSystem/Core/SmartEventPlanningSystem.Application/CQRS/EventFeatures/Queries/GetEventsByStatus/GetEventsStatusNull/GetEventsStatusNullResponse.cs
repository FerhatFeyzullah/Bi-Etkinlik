using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusNull
{
    public class GetEventsStatusNullResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }
    }
}
