using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusFalse
{
    public class GetEventsICreatedStatusFalseRequest:IRequest<GetEventsICreatedStatusFalseResponse>
    {
        public int AppUserId { get; set; }
    }
}
