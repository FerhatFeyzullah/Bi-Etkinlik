using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.DeleteEventRegister
{
    public class DeleteEventRegisterHandler(IEventRegisterService eventRegisterService) : IRequestHandler<DeleteEventRegisterRequest, Unit>
    {
        public async Task<Unit> Handle(DeleteEventRegisterRequest request, CancellationToken cancellationToken)
        {
            await eventRegisterService.DeleteEventRegister(request.EventId, request.AppUserId, cancellationToken);
            return Unit.Value;
        }
    }
}
