using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_City
{
    public class GetE_F_CityRequest : IRequest<GetE_F_CityResponse>
    {
        public int AppUserId { get; set; }

        public List<string> Cities { get; set; }

    }
}
