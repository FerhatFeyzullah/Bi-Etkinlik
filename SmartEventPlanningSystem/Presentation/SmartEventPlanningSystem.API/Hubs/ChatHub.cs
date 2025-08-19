using MediatR;
using Microsoft.AspNetCore.SignalR;
using SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Commands.CreateMessage;
using SmartEventPlanningSystem.Application.DTOs.MessageDto;


namespace SmartEventPlanningSystem.Infrastructure.Hubs
{
    public class ChatHub(IMediator mediator) : Hub
    {

        public async Task JoinEventGroup(int eventId)
        {
            await Groups.AddToGroupAsync((Context.ConnectionId), $"Event-{eventId}");
        }

        public async Task LeaveEventGroup(int eventId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Event-{eventId}");
        }

        public async Task SendMessageToEventGroup(int eventId, int userId, string userName, string message)
        {
            var payload = new
            {
                sender = userName,
                message = message
            };

            await Clients.Group($"Event-{eventId}").SendAsync("ReceiveGroupMessage", payload);

            var messageDto = new CreateMessageDto
            {
                EventId = eventId,
                AppUserId = userId,
                Content = message
            };
            Console.WriteLine($"Message sent to event {eventId} by user {userId}: {message}");
            await mediator.Publish(new CreateMessageNotification { MessageDto = messageDto });
        }


    }
}
