using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateEmailNotification
{
    public class UpdateEmailNotificationHandler(IUserSettingService userSettingService) : IRequestHandler<UpdateEmailNotificationRequest, UpdateEmailNotificationResponse>
    {
        public async Task<UpdateEmailNotificationResponse> Handle(UpdateEmailNotificationRequest request, CancellationToken cancellationToken)
        {
            var setting = await userSettingService.UpdateEmailNotification(request.AppUserId, request.EmailNotification, cancellationToken);
            return new UpdateEmailNotificationResponse
            {
                UserSetting = setting,
            };
        }
    }
}
