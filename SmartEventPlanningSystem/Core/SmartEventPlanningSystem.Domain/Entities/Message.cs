using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SmartEventPlanningSystem.Domain.Entities
{
    [Index(nameof(EventId), nameof(SendingTime))]
    public class Message
    {
        public int MessageId { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public string Content { get; set; }
        [Column(TypeName = "timestamp without time zone")]
        public DateTime SendingTime { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
