using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.RemoveEvent
{
    public class RemoveEventHandler(IEventService eventService,IFileStorageService fileStorageService) : IRequestHandler<RemoveEventRequest, Unit>
    {
        public async Task<Unit> Handle(RemoveEventRequest request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            
            var path = await eventService.RemoveEvent(request.EventId, cancellationToken);

            await fileStorageService.DeleteImage(path); 

            return Unit.Value;
        }
    }
}
