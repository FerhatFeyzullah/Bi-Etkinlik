using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.IsEventFinished
{
    public class IsEventFinishedRequest : IRequest<bool>
    {
        public int EventId { get; set; }
    }
}
