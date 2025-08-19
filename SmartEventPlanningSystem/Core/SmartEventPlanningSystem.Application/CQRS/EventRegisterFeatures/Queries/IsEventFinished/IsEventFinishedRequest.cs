using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.IsEventFinished
{
    public class IsEventFinishedRequest:IRequest<bool>
    {
        public int EventId { get; set; }
    }
}
