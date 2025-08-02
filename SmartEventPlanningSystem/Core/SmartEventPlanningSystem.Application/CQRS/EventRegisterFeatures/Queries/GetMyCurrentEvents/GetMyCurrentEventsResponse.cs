using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents
{
    public class GetMyCurrentEventsResponse
    {
        public int EventRegisterId { get; set; }
        public bool IsScored { get; set; }
        public MyCurrentEventsDto Event { get; set; }
    }
}
