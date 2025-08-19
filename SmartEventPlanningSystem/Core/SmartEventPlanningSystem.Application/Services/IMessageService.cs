using SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Queries.GetMessagesForEvent;
using SmartEventPlanningSystem.Application.DTOs.MessageDto;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IMessageService
    {
        Task CreateMessage(CreateMessageDto createMessageDto, CancellationToken ct);

        Task<GetMessagesForEventResponse> GetMessagesForEvent(int eventId, CancellationToken ct);
    }
}
