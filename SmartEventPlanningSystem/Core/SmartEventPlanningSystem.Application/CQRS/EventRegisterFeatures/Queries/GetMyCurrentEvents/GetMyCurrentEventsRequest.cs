using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents
{
    public class GetMyCurrentEventsRequest : IRequest<List<GetMyCurrentEventsResponse>>
    {
        public int AppUserId { get; set; }
    }
}
