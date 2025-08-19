using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents
{
    public class GetMyCurrentEventsHandler(IEventRegisterService eventRegisterService) : IRequestHandler<GetMyCurrentEventsRequest, List<GetMyCurrentEventsResponse>>
    {
        public async Task<List<GetMyCurrentEventsResponse>> Handle(GetMyCurrentEventsRequest request, CancellationToken cancellationToken)
        {
            return await eventRegisterService.GetMyCurrentEvents(request.AppUserId, cancellationToken);

        }
    }
}
