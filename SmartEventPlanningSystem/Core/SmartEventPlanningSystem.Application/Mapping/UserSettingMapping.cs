using AutoMapper;
using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class UserSettingMapping : Profile
    {
        public UserSettingMapping()
        {
            CreateMap<UserSetting, UserSettingDto>().ReverseMap();
        }
    }
}
