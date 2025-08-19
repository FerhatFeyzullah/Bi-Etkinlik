using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting
{
    public class GetUserSettingHandler(IUserSettingService userSettingService) : IRequestHandler<GetUserSettingRequest, GetUserSettingResponse>
    {
        public async Task<GetUserSettingResponse> Handle(GetUserSettingRequest request, CancellationToken cancellationToken)
        {
            var setting = await userSettingService.GetUserSetting(request.AppUserId, cancellationToken);
            return new GetUserSettingResponse
            {
                UserSetting = setting
            };

        }
    }
}
