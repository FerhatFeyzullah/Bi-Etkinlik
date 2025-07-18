using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionTrue
{
    public class SetEventPermissionTrueHandler(IEventService eventService) : IRequestHandler<SetEventPermissionTrueRequest, Unit>
    {
        public async Task<Unit> Handle(SetEventPermissionTrueRequest request, CancellationToken cancellationToken)
        {
             await eventService.SetEventPermissionTrue(request.EventId, cancellationToken);
            return Unit.Value;
        }
    }
}
