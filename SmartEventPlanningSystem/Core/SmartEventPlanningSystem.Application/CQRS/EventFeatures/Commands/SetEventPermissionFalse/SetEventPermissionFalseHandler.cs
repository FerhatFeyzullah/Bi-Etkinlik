using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionFalse
{
    public class SetEventPermissionFalseHandler(IEventService eventService) : IRequestHandler<SetEventPermissionFalseRequest, Unit>
    {
        public async Task<Unit> Handle(SetEventPermissionFalseRequest request, CancellationToken cancellationToken)
        {
            await eventService.SetEventPermissionFalse(request.EventId, cancellationToken);
            return Unit.Value;
        }
    }
}
