using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Queries.GetMessagesForEvent
{
    public class GetMessagesForEventRequest:IRequest<GetMessagesForEventResponse>
    {
        public int EventId { get; set; }
    }
}
