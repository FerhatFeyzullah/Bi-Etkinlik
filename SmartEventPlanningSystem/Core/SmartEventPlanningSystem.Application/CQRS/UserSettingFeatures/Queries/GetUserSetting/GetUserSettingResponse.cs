using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting
{
    public class GetUserSettingResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
