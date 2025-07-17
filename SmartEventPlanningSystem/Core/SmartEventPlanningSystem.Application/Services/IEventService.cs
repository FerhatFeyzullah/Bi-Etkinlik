using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IEventService
    {
        Task CreateEvent(CreateEventDto createEventDto,List<int> Catgeories,CancellationToken ct);
    }
}
