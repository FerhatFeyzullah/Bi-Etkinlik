using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionTrue
{
    public class SetEventPermissionTrueRequest : IRequest<Unit>
    {
        public int EventId { get; set; }
    }
}
