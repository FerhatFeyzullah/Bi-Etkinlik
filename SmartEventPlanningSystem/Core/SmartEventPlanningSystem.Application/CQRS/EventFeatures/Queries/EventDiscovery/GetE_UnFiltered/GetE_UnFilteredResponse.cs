using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_UnFiltered
{
    public class GetE_UnFilteredResponse
    {
        public List<EventsDiscoveryDto> Events { get; set; }
    }
}
