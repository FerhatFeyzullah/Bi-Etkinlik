using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RateTheEvent
{
    public class RateTheEventRequest:IRequest<bool>
    {
        public int EventRegisterId { get; set; }
        public decimal Score { get; set; }
    }
}
