using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Domain.Entities
{
    public class Message
    {
        public int MessageId { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public string Content { get; set; }
        public DateTime SendingTime { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
