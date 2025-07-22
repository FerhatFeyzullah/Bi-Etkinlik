using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.DTOs.MessageDto
{
    public class CreateMessageDto
    {
        public int AppUserId { get; set; }
        public string Content { get; set; }

        public int EventId { get; set; }
    }
}
