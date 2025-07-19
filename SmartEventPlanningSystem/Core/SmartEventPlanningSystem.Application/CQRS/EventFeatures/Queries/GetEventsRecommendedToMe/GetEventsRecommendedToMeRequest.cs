using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsRecommendedToMe
{
    public class GetEventsRecommendedToMeRequest:IRequest<GetEventsRecommendedToMeResponse>
    {
        public int AppUserId { get; set; }
    }
}
