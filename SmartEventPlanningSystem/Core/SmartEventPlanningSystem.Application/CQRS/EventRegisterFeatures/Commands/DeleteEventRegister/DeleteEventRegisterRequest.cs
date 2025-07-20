using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.DeleteEventRegister
{
    public class DeleteEventRegisterRequest:IRequest<Unit>
    {
        public int AppUserId { get; set; }
        public int EventId { get; set; }
    }
}
