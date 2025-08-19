using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateLanguageSetting
{
    public class UpdateLanguageSettingResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
