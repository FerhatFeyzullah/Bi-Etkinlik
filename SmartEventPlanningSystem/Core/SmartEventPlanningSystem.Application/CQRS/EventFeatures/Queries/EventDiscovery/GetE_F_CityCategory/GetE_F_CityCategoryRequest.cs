using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_CityCategory
{
    public class GetE_F_CityCategoryRequest : IRequest<GetE_F_CityCategoryResponse>
    {
        public int AppUserId { get; set; }

        public List<string> Cities { get; set; }
        public List<int> Categories { get; set; }
    }
}
