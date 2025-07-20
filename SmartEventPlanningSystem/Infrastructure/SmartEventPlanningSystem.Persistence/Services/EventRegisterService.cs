using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class EventRegisterService(IUnitOfWork unitOfWork,IMapper mapper) : IEventRegisterService
    {
        public async Task RegisterEvent(int eventId, int userId, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();         
          
                var register = new EventRegister
                {
                    AppUserId = userId,
                    EventId = eventId,
                };
                await unitOfWork.WriteRepository<EventRegister>().AddAsync(register, ct);

                await unitOfWork.CommitAsync();
 
        }

        public async Task DeleteEventRegister(int eventId, int userId, CancellationToken ct)
        {
            var eventToDelete = await unitOfWork.ReadRepository<EventRegister>().GetByFiltered(
                x =>
                x.AppUserId == userId &&
                x.EventId == eventId, ct
                );

            unitOfWork.WriteRepository<EventRegister>().DeleteEntity(eventToDelete);
            await unitOfWork.CommitAsync();
        }

        public async Task<GetEventsI_JoinedResponse> GetEventsI_Joined(int id, CancellationToken ct)
        {
            var value = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(
                x =>
                x.AppUserId == id,
                q => q.Include(x => x.Event), ct);

            var events = value.Select(x => x.Event).ToList();

            return new GetEventsI_JoinedResponse
            {
                Events = mapper.Map<List<EventsI_JoinedDto>>(events)
            };

        }

       
    }
}
