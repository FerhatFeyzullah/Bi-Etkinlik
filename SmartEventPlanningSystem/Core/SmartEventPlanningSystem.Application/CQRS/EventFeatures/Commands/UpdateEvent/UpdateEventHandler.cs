using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent
{
    public class UpdateEventHandler(IEventService eventService) : IRequestHandler<UpdateEventRequest, UpdateEventResponse>
    {
        public async Task<UpdateEventResponse> Handle(UpdateEventRequest request, CancellationToken cancellationToken)
        {
            return await eventService.UpdateEvent(request.EventDto, request.EventCategories,request.AppUserId, cancellationToken);
        }
    }
}
