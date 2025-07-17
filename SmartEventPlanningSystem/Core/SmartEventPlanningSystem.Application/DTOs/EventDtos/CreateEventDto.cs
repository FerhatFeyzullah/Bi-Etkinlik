using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.DTOs.EventDtos
{
    public class CreateEventDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateOnly Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }


        // Location
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public int AppUserId { get; set; }
    }
}
