using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateThemeSetting
{
    public class UpdateThemeSettingHandler(IUserSettingService userSettingService) : IRequestHandler<UpdateThemeSettingRequest, UpdateThemeSettingResponse>
    {
        public async Task<UpdateThemeSettingResponse> Handle(UpdateThemeSettingRequest request, CancellationToken cancellationToken)
        {
            var setting = await userSettingService.UpdateTheme(request.AppUserId, request.Theme, cancellationToken);
            return new UpdateThemeSettingResponse
            {
                UserSetting = setting
            };
        }
    }
}
