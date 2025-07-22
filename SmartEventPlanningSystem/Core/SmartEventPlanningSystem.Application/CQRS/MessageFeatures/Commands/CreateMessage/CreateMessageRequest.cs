using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.DTOs.MessageDto;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Commands.CreateMessage
{
    public class CreateMessageRequest:IRequest<Unit>
    {
        public CreateMessageDto MessageDto { get; set; }
    }
}
