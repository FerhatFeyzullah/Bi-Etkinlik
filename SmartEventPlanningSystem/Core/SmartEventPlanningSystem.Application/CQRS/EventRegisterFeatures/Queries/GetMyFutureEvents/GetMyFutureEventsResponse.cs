using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents
{
    public class GetMyFutureEventsResponse
    {
        public int EventRegisterId { get; set; }
        public bool IsScored { get; set; }
        public MyFutureEventsDto Event { get; set; }
    }
}
