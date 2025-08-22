using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusFalse
{
    public class GetEventsStatusFalseRequest : IRequest<GetEventsStatusFalseResponse>
    {
    }
}
