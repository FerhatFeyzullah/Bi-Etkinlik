using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents
{
    public class GetMyFutureEventsHandler(IEventRegisterService eventRegisterService) : IRequestHandler<GetMyFutureEventsRequest, List<GetMyFutureEventsResponse>>
    {
        public async Task<List<GetMyFutureEventsResponse>> Handle(GetMyFutureEventsRequest request, CancellationToken cancellationToken)
        {
            return await eventRegisterService.GetMyFutureEvents(request.AppUserId, cancellationToken);
        }
    }
}
