using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.RemoveEvent
{
    public class RemoveEventRequest : IRequest<Unit>
    {
        public int EventId { get; set; }
    }
}
