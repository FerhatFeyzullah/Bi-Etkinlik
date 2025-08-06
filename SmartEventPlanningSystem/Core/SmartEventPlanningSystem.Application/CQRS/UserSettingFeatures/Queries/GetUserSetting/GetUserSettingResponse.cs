using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting
{
    public class GetUserSettingResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
