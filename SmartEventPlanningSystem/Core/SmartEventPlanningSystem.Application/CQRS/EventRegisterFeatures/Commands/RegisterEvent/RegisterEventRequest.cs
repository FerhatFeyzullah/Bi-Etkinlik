using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RegisterEvent
{
    public class RegisterEventRequest : IRequest<bool>
    {
        public int AppUserId { get; set; }
        public int EventId { get; set; }
    }
}
