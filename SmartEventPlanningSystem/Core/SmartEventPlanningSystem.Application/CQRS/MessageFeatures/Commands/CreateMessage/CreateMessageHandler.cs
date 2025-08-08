using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Org.BouncyCastle.Asn1.Ocsp;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Commands.CreateMessage
{
    public class CreateMessageHandler(IMessageService messageService) : INotificationHandler<CreateMessageNotification>
    {
        public async Task Handle(CreateMessageNotification notification, CancellationToken cancellationToken)
        {
            await messageService.CreateMessage(notification.MessageDto, cancellationToken);
        }
    }
}
