using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsRecommendedToMe
{
    public class GetEventsRecommendedToMeResponse
    {
        public List<EventsDiscoveryDto> Events { get; set; }
    }
}
