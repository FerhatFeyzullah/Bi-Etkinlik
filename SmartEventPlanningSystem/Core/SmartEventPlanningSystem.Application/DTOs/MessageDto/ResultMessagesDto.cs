using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.DTOs.MessageDto
{
    public class ResultMessagesDto
    {
        public int MessageId { get; set; }
        public string UserName { get; set; }

        public string Content { get; set; }
        public DateTime SendingTime { get; set; }

    }
}
