using AutoMapper;
using SmartEventPlanningSystem.Application.DTOs.AppUserCatgeoryDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class AppUserCategoryMapping : Profile
    {
        public AppUserCategoryMapping()
        {
            CreateMap<AppUserCategory, ResultAppUserCategoryDto>().ReverseMap();
        }
    }
}
