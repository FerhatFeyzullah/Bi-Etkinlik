using MediatR;
using SmartEventPlanningSystem.Application.DTOs.MessageDto;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Commands.CreateMessage
{
    public class CreateMessageNotification : INotification
    {
        public CreateMessageDto MessageDto { get; set; }
    }
}
