using AutoMapper;
using SmartEventPlanningSystem.Application.DTOs.MessageDto;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class MessageMapping : Profile
    {
        public MessageMapping()
        {
            CreateMap<Message, CreateMessageDto>().ReverseMap();
            CreateMap<Message, ResultMessagesDto>().ReverseMap();
        }
    }
}
