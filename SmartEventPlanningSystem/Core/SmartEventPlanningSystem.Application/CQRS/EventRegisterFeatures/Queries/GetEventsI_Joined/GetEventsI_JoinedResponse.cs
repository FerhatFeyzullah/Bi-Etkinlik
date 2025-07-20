using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined
{
    public class GetEventsI_JoinedResponse
    {
        public List<EventsI_JoinedDto> Events { get; set; }
    }
}
