using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RegisterEvent
{
    public class RegisterEventRequest:IRequest<bool>
    {
        public int AppUserId { get; set; }
        public int EventId { get; set; }
    }
}
