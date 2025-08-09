using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.DTOs.MessageDto;

namespace SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Queries.GetMessagesForEvent
{
    public class GetMessagesForEventResponse
    {

        public List<ResultMessagesDto> AllMessages { get; set; }
    }
}
