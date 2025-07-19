using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventCategoryDtos;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.DTOs.EventDtos
{
    public class EventsDiscoveryDto
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string City { get; set; }

        //Location
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public ResultUserForEvent User { get; set; }
        public List<ResultEventCategoryDto> EventCategories { get; set; }
    }
}
