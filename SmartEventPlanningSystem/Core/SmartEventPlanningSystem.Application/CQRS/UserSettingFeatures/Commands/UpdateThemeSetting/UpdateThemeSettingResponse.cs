using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateThemeSetting
{
    public class UpdateThemeSettingResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
