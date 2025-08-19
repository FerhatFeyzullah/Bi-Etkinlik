using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCityCategory
{
    public class GetE_F_DateCityCategoryHandler(IEventService eventService) : IRequestHandler<GetE_F_DateCityCategoryRequest, GetE_F_DateCityCategoryResponse>
    {
        public async Task<GetE_F_DateCityCategoryResponse> Handle(GetE_F_DateCityCategoryRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_F_DateCityCategory(request.AppUserId, request.Start, request.End, request.Cities, request.Categories, cancellationToken);
        }
    }
}
