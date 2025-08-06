using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateViewModeSetting
{
    public class UpdateViewModeSettingResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
