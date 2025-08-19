using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.IsEventFinished
{
    public class IsEventFinishedHandler(IEventService eventService) : IRequestHandler<IsEventFinishedRequest, bool>
    {
        public async Task<bool> Handle(IsEventFinishedRequest request, CancellationToken cancellationToken)
        {
            return await eventService.IsEventFinished(request.EventId, cancellationToken);
        }
    }
}
