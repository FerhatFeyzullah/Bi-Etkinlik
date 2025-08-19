using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_UnFiltered
{
    public class GetE_UnFilteredRequest : IRequest<GetE_UnFilteredResponse>
    {
        public int AppUserId { get; set; }
    }
}
