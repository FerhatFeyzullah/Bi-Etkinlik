using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RateTheEvent
{
    public class RateTheEventHnadler(IEventRegisterService eventRegisterService) : IRequestHandler<RateTheEventRequest, bool>
    {
        public async Task<bool> Handle(RateTheEventRequest request, CancellationToken cancellationToken)
        {
            return await eventRegisterService.RateTheEvent(request.EventRegisterId, request.Score, cancellationToken);
        }
    }
}
