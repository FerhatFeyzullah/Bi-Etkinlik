using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent
{
    public class UpdateEventResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }

    }
}
