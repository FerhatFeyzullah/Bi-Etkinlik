using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateLanguageSetting
{
    public class UpdateLanguageSettingHandler(IUserSettingService userSettingService) : IRequestHandler<UpdateLanguageSettingRequest, UpdateLanguageSettingResponse>
    {
        public async Task<UpdateLanguageSettingResponse> Handle(UpdateLanguageSettingRequest request, CancellationToken cancellationToken)
        {
            var setting = await userSettingService.UpdateLanguage(request.AppUserId, request.Language, cancellationToken);

            return new UpdateLanguageSettingResponse
            {
                UserSetting = setting
            };
        }
    }
}
