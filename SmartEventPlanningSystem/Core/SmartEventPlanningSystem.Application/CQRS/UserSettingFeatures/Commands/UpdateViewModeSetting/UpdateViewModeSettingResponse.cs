using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateViewModeSetting
{
    public class UpdateViewModeSettingResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
