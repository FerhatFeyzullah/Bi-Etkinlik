using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents
{
    public class GetMyPastEventsResponse
    {
        public int EventRegisterId { get; set; }
        public bool IsScored { get; set; }
        public MyPastEventsDto Event { get; set; }
    }
}
