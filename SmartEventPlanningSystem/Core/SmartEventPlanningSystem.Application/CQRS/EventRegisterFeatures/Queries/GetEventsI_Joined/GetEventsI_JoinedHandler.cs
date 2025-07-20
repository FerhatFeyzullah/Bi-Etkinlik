using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined
{
    public class GetEventsI_JoinedHandler( IEventRegisterService eventRegisterService) : IRequestHandler<GetEventsI_JoinedRequest, GetEventsI_JoinedResponse>
    {
        public async Task<GetEventsI_JoinedResponse> Handle(GetEventsI_JoinedRequest request, CancellationToken cancellationToken)
        {
            return await eventRegisterService.GetEventsI_Joined(request.AppUserId, cancellationToken);
        }
    }
}
