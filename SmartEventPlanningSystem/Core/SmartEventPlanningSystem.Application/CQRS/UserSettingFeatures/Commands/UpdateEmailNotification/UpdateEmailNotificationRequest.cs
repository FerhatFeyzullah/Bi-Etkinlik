using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateEmailNotification
{
    public class UpdateEmailNotificationRequest : IRequest<UpdateEmailNotificationResponse>
    {
        public int AppUserId { get; set; }
        public bool EmailNotification { get; set; }
    }
}
