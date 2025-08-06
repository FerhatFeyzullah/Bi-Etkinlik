using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateViewModeSetting
{
    public class UpdateViewModeSettingRequest:IRequest<UpdateViewModeSettingResponse>
    {
        public int AppUserId { get; set; }
        public string ViewMode { get; set; }
    }
}
