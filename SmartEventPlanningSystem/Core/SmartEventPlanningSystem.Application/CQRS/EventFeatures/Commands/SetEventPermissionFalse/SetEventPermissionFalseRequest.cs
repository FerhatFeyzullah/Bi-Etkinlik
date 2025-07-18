using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionFalse
{
    public class SetEventPermissionFalseRequest:IRequest<Unit>
    {
        public int EventId { get; set; }
    }
}
