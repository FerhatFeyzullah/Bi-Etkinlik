using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetAllEventsI_Joined
{
    public class GetAllEventsI_JoinedResponse
    {
        public List<EventForMessageDto> Events { get; set; }
    }
}
