using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCity
{
    public class GetE_F_DateCityRequest : IRequest<GetE_F_DateCityResponse>
    {
        public int AppUserId { get; set; }

        public DateOnly Start { get; set; }
        public DateOnly End { get; set; }
        public List<string> Cities { get; set; }
    }
}
