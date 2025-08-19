using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsRecommendedToMe
{
    public class GetEventsRecommendedToMeRequest : IRequest<GetEventsRecommendedToMeResponse>
    {
        public int AppUserId { get; set; }
    }
}
