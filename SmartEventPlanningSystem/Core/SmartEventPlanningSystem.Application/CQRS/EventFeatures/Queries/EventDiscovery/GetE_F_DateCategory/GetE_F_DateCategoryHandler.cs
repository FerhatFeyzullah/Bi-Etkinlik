using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCategory
{
    public class GetE_F_DateCategoryHandler(IEventService eventService) : IRequestHandler<GetE_F_DateCategoryRequest, GetE_F_DateCategoryResponse>
    {
        public async Task<GetE_F_DateCategoryResponse> Handle(GetE_F_DateCategoryRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_F_DateCategory(request.AppUserId, request.Start, request.End, request.Categories, cancellationToken);
        }
    }
}
