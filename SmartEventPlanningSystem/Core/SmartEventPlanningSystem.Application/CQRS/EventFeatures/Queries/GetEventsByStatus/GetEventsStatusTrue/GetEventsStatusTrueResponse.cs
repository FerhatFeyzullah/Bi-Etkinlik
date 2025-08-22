using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusTrue
{
    public class GetEventsStatusTrueResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }

    }
}
