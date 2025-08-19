using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetAllEventsI_Joined
{
    public class GetAllEventsI_JoinedRequest : IRequest<GetAllEventsI_JoinedResponse>
    {
        public int AppUserId { get; set; }
    }
}
