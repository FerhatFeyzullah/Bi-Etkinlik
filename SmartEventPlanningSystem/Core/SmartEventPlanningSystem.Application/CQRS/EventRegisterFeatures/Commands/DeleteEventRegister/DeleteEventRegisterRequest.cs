using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.DeleteEventRegister
{
    public class DeleteEventRegisterRequest : IRequest<Unit>
    {
        public int AppUserId { get; set; }
        public int EventId { get; set; }
    }
}
