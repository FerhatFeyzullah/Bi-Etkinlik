using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateEmailNotification
{
    public class UpdateEmailNotificationResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
