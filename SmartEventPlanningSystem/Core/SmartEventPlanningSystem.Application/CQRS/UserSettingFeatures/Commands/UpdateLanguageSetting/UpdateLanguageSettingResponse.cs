using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateLanguageSetting
{
    public class UpdateLanguageSettingResponse
    {
        public UserSettingDto UserSetting { get; set; }
    }
}
