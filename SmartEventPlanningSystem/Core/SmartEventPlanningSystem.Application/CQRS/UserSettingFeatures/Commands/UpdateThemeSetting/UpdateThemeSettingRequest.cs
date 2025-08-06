using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateThemeSetting
{
    public class UpdateThemeSettingRequest:IRequest<UpdateThemeSettingResponse>
    {
        public int AppUserId { get; set; }
        public string Theme { get; set; }
    }
}
