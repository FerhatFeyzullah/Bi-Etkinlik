using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RateTheEvent
{
    public class RateTheEventRequest : IRequest<bool>
    {
        public int EventRegisterId { get; set; }
        public decimal Score { get; set; }
    }
}
