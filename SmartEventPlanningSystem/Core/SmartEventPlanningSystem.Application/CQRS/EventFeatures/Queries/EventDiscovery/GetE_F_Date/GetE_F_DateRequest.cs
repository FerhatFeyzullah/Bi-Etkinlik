using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Date
{
    public class GetE_F_DateRequest : IRequest<GetE_F_DateResponse>
    {
        public int AppUserId { get; set; }

        public DateOnly Start { get; set; }
        public DateOnly End { get; set; }
    }
}
