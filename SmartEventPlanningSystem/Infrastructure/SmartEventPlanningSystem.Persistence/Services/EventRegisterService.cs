using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents;
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

        public async Task<List<GetMyPastEventsResponse>> GetMyPastEvents (int id, CancellationToken ct)
        {
            var now = DateTime.Now;
            var value = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(

                    x => x.AppUserId == id &&
                    x.Event.EndDate < now ,
                   
                    q => q
                    .Include(x => x.Event)
                    .ThenInclude(e => e.AppUser)
                    .Include(x => x.Event)
                    .ThenInclude(e => e.EventCategories)
                    .ThenInclude(ec => ec.Category),
                    ct);


            return mapper.Map<List<GetMyPastEventsResponse>>(value);

        }

        public async Task<List<GetMyCurrentEventsResponse>> GetMyCurrentEvents(int id, CancellationToken ct)
        {
            var now = DateTime.Now;
            var value = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(

                    x => x.AppUserId == id &&
                    x.Event.StartDate < now && x.Event.EndDate > now,

                    q => q
                    .Include(x => x.Event)
                    .ThenInclude(e => e.AppUser)
                    .Include(x => x.Event)
                    .ThenInclude(e => e.EventCategories)
                    .ThenInclude(ec => ec.Category),
                    ct);

            return mapper.Map<List<GetMyCurrentEventsResponse>>(value);
        }

        public async Task<List<GetMyFutureEventsResponse>> GetMyFutureEvents(int id, CancellationToken ct)
        {
            var now = DateTime.Now;
            var value = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(

                    x => x.AppUserId == id &&
                    x.Event.StartDate > now,

                    q => q
                    .Include(x => x.Event)
                    .ThenInclude(e => e.AppUser)
                    .Include(x => x.Event)
                    .ThenInclude(e => e.EventCategories)
                    .ThenInclude(ec => ec.Category),
                    ct);
            return  mapper.Map<List<GetMyFutureEventsResponse>>(value);
        }
    }
}
