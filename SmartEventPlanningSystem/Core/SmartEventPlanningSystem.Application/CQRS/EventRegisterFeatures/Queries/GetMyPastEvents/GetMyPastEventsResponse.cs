using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventCategoryDtos;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents
{
    public class GetMyPastEventsResponse
    {
        public int EventRegisterId { get; set; }
        public bool IsScored { get; set; }
        public MyPastEventsDto Event { get; set; }
    }
}
