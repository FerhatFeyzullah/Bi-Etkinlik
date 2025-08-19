using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCategory
{
    public class GetE_F_DateCategoryResponse
    {
        public List<EventsDiscoveryDto> Events { get; set; }

    }
}
