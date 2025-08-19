using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Category
{
    public class GetE_F_CategoryResponse
    {
        public List<EventsDiscoveryDto> Events { get; set; }

    }
}
