using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined
{
    public class GetEventsI_JoinedRequest:IRequest<GetEventsI_JoinedResponse>
    {
        public int AppUserId { get; set; }
    }
}
