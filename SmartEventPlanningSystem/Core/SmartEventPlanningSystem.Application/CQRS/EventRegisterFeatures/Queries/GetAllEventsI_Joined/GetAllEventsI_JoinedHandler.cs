using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetAllEventsI_Joined
{
    public class GetAllEventsI_JoinedHandler(IEventRegisterService eventRegisterService) : IRequestHandler<GetAllEventsI_JoinedRequest, GetAllEventsI_JoinedResponse>
    {
        public async Task<GetAllEventsI_JoinedResponse> Handle(GetAllEventsI_JoinedRequest request, CancellationToken cancellationToken)
        {
            var events = await eventRegisterService.GetAllEventI_Joined(request.AppUserId, cancellationToken);
            return new GetAllEventsI_JoinedResponse
            {
                Events = events
            };
        }
    }
}
