using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents
{
    public class GetMyPastEventsHandler(IEventRegisterService eventRegisterService) : IRequestHandler<GetMyPastEventsRequest, List<GetMyPastEventsResponse>>
    {
        public async Task<List<GetMyPastEventsResponse>> Handle(GetMyPastEventsRequest request, CancellationToken cancellationToken)
        {
            return await eventRegisterService.GetMyPastEvents(request.AppUserId, cancellationToken);
        }
    }
}
