using AutoMapper;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class EventRegisterMapping : Profile
    {
        public EventRegisterMapping()
        {
            CreateMap<EventRegister, GetMyCurrentEventsResponse>().ReverseMap();
            CreateMap<EventRegister, GetMyPastEventsResponse>().ReverseMap();
            CreateMap<EventRegister, GetMyFutureEventsResponse>().ReverseMap();
        }
    }
}
