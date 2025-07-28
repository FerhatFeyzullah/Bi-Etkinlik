using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventCategoryDtos;

namespace SmartEventPlanningSystem.Application.DTOs.EventDtos
{
    public class EventsI_CreatedDto
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Status { get; set; }
        public string City { get; set; }
        public string EventImageId { get; set; }

        //Location
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public List<ResultEventCategoryDto> EventCategories { get; set; }
    }
}
