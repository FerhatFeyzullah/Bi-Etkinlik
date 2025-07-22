using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Xsl;
using AutoMapper;
using SmartEventPlanningSystem.Application.DTOs.MessageDto;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class MessageMapping:Profile
    {
        public MessageMapping()
        {
            CreateMap<Message, CreateMessageDto>().ReverseMap();
            CreateMap<Message, ResultMessagesDto>().ReverseMap();
        }
    }
}
