using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents
{
    public class GetMyPastEventsRequest:IRequest<List<GetMyPastEventsResponse>>
    {
        public int AppUserId { get; set; }
    }
}
