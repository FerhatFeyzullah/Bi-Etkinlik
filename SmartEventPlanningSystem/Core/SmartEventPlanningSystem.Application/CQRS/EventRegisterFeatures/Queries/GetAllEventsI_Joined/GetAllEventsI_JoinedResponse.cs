using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetAllEventsI_Joined
{
    public class GetAllEventsI_JoinedResponse
    {
        public List<EventForMessageDto> Events { get; set; }
    }
}
