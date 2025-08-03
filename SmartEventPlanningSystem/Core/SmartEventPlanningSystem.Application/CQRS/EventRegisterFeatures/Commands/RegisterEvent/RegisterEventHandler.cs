using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RegisterEvent
{
    public class RegisterEventHandler(IEventRegisterService eventRegisterService) : IRequestHandler<RegisterEventRequest, bool>
    {
        public async Task<bool> Handle(RegisterEventRequest request, CancellationToken cancellationToken)
        {
            try
            {
                await eventRegisterService.RegisterEvent(request.EventId, request.AppUserId, cancellationToken);
                return true;
            }
            catch { 
                return false;

            }




        }
    }
}
