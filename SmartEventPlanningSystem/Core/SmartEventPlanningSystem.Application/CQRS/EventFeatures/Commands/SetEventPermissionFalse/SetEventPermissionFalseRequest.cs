using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionFalse
{
    public class SetEventPermissionFalseRequest : IRequest<Unit>
    {
        public int EventId { get; set; }
    }
}
