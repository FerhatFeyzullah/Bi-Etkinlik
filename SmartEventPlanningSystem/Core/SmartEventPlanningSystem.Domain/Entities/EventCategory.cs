using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Domain.Entities
{
    public class EventCategory
    {
        public int EventCategoryId { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
