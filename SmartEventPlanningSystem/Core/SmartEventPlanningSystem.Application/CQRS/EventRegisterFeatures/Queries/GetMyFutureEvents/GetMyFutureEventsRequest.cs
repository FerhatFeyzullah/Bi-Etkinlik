using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents
{
    public class GetMyFutureEventsRequest:IRequest<List<GetMyFutureEventsResponse>>
    {
        public int AppUserId { get; set; }

    }
}
