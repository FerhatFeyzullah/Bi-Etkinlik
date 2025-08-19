using MediatR;
using SmartEventPlanningSystem.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.IsEventFinished
{
    public class IsEventFinishedHandler(IEventService eventService) : IRequestHandler<IsEventFinishedRequest, bool>
    {
        public async Task<bool> Handle(IsEventFinishedRequest request, CancellationToken cancellationToken)
        {
            return await eventService.IsEventFinished(request.EventId, cancellationToken);
        }
    }
}
