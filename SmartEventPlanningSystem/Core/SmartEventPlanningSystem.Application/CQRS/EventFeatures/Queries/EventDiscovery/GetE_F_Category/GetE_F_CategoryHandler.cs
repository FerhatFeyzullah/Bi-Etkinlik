using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Category
{
    public class GetE_F_CategoryHandler(IEventService eventService) : IRequestHandler<GetE_F_CategoryRequest, GetE_F_CategoryResponse>
    {
        public async Task<GetE_F_CategoryResponse> Handle(GetE_F_CategoryRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_F_Category(request.AppUserId, request.Categories, cancellationToken);
        }
    }
}
