using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Commands.CreateMessage
{
    public class CreateMessageHandler(IMessageService messageService) : IRequestHandler<CreateMessageRequest, Unit>
    {
        public async Task<Unit> Handle(CreateMessageRequest request, CancellationToken cancellationToken)
        {
            await messageService.SendMessage(request.MessageDto, cancellationToken);
            return Unit.Value;
        }
    }
}
