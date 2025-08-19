using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_UnFiltered
{
    public class GetE_UnFilteredHandler(IEventService eventService) : IRequestHandler<GetE_UnFilteredRequest, GetE_UnFilteredResponse>
    {
        public async Task<GetE_UnFilteredResponse> Handle(GetE_UnFilteredRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_UnFiltered(request.AppUserId, cancellationToken);
        }
    }
}
