using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents
{
    public class GetMyFutureEventsRequest : IRequest<List<GetMyFutureEventsResponse>>
    {
        public int AppUserId { get; set; }

    }
}
