using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.RemoveEvent
{
    public class RemoveEventHandler(IEventService eventService) : IRequestHandler<RemoveEventRequest, Unit>
    {
        public async Task<Unit> Handle(RemoveEventRequest request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            await eventService.RemoveEvent(request.EventId, cancellationToken);

            return Unit.Value;
        }
    }
}
