using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Queries.GetMessagesForEvent
{
    public class GetMessagesForEventRequest : IRequest<GetMessagesForEventResponse>
    {
        public int EventId { get; set; }
    }
}
