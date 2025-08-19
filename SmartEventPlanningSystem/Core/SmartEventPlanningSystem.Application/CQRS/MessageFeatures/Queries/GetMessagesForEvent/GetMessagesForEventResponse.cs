using SmartEventPlanningSystem.Application.DTOs.MessageDto;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Queries.GetMessagesForEvent
{
    public class GetMessagesForEventResponse
    {

        public List<ResultMessagesDto> AllMessages { get; set; }
    }
}
