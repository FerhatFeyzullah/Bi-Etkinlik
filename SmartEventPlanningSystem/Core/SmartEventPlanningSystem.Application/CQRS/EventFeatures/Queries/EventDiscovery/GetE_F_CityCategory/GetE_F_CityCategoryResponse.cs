using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_CityCategory
{
    public class GetE_F_CityCategoryResponse
    {
        public List<EventsDiscoveryDto> Events { get; set; }

    }
}
