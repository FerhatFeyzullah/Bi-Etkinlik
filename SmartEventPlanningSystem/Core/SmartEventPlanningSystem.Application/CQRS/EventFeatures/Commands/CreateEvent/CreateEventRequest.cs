using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.CreateEvent
{
    public class CreateEventRequest:IRequest<bool>
    {     
        public CreateEventDto EventDto { get; set; }
        public List<int> EventCategories { get; set; }
    }
}
