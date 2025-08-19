using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCategory
{
    public class GetE_F_DateCategoryRequest : IRequest<GetE_F_DateCategoryResponse>
    {
        public int AppUserId { get; set; }

        public DateOnly Start { get; set; }
        public DateOnly End { get; set; }
        public List<int> Categories { get; set; }
    }
}
