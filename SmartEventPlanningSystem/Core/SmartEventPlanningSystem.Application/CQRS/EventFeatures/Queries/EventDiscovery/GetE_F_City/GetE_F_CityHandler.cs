using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_City
{
    public class GetE_F_CityHandler(IEventService eventService) : IRequestHandler<GetE_F_CityRequest, GetE_F_CityResponse>
    {
        public async Task<GetE_F_CityResponse> Handle(GetE_F_CityRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_F_City(request.AppUserId, request.Cities, cancellationToken);
        }
    }
}
