using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting
{
    public class GetUserSettingHandler(IUserSettingService userSettingService) : IRequestHandler<GetUserSettingRequest, GetUserSettingResponse>
    {
        public async Task<GetUserSettingResponse> Handle(GetUserSettingRequest request, CancellationToken cancellationToken)
        {
            var setting =  await userSettingService.GetUserSetting(request.AppUserId, cancellationToken);
            return new GetUserSettingResponse
            {
                UserSetting = setting
            };

        }
    }
}
