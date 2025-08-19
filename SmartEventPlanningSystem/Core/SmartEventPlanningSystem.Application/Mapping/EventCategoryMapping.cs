using AutoMapper;
using SmartEventPlanningSystem.Application.DTOs.EventCategoryDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class EventCategoryMapping : Profile
    {
        public EventCategoryMapping()
        {
            CreateMap<EventCategory, ResultEventCategoryDto>().ReverseMap();
        }
    }
}
