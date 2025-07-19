using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusFalse
{
    public class GetEventsICreatedStatusFalseResponse
    {
        public List<EventsI_CreatedDto> Events { get; set; }

    }
}
