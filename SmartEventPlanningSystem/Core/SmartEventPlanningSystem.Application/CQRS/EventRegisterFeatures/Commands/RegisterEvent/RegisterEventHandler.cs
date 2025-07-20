using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RegisterEvent
{
    public class RegisterEventHandler(IEventRegisterService eventRegisterService) : IRequestHandler<RegisterEventRequest, Unit>
    {
        public async Task<Unit> Handle(RegisterEventRequest request, CancellationToken cancellationToken)
        {
            await eventRegisterService.RegisterEvent(request.EventId, request.AppUserId, cancellationToken);
            return Unit.Value;  
        }
    }
}
