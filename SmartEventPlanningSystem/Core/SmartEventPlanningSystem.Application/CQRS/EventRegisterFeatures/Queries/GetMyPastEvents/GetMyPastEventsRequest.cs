using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents
{
    public class GetMyPastEventsRequest : IRequest<List<GetMyPastEventsResponse>>
    {
        public int AppUserId { get; set; }
    }
}
