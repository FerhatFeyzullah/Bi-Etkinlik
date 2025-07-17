using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class EventMapping:Profile
    {
        public EventMapping()
        {
            //CreateMap<Event, CreateEventDto>().ReverseMap();
        }
    }
}
