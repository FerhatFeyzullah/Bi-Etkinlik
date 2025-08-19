using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Date
{
    public class GetE_F_DateHandler(IEventService eventService) : IRequestHandler<GetE_F_DateRequest, GetE_F_DateResponse>
    {
        public async Task<GetE_F_DateResponse> Handle(GetE_F_DateRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_F_Date(request.AppUserId, request.Start, request.End, cancellationToken);
        }
    }
}
