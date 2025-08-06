using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateLanguageSetting
{
    public class UpdateLanguageSettingRequest : IRequest<UpdateLanguageSettingResponse>
    {
        public int AppUserId { get; set; }
        public string Language { get; set; }
    }
}
