using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IEventService
    {
        Task CreateEvent(CreateEventDto createEventDto,List<int> Catgeories,CancellationToken ct);
        Task<UpdateEventResponse> UpdateEvent(UpdateEventDto updateEventDto, List<int> Catgeories, int id, CancellationToken ct);
        Task RemoveEvent(int id, CancellationToken ct);
        Task SetEventPermissionTrue(int id,CancellationToken ct);
        Task SetEventPermissionFalse(int id,CancellationToken ct);
        Task<GetEventsICreatedUnFilteredResponse> GetEventsI_CreatedUnFiltered(int id, CancellationToken ct);
    }
}
