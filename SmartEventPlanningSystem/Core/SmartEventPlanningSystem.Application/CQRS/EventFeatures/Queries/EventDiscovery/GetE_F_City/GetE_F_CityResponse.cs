using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_City
{
    public class GetE_F_CityResponse
    {
        public List<EventsDiscoveryDto> Events { get; set; }

    }
}
