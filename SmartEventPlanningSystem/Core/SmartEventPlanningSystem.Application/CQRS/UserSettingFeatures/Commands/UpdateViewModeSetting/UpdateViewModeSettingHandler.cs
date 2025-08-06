using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateViewModeSetting
{
    public class UpdateViewModeSettingHandler(IUserSettingService userSettingService) : IRequestHandler<UpdateViewModeSettingRequest, UpdateViewModeSettingResponse>
    {
        public async Task<UpdateViewModeSettingResponse> Handle(UpdateViewModeSettingRequest request, CancellationToken cancellationToken)
        {
            var setting = await userSettingService.UpdateViewMode(request.AppUserId, request.ViewMode, cancellationToken);

            return new UpdateViewModeSettingResponse
            {
                UserSetting = setting
            };
        }
    }
}
