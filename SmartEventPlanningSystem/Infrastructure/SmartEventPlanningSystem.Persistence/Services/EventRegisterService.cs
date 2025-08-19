using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class EventRegisterService(IUnitOfWork unitOfWork, IMapper mapper) : IEventRegisterService
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

        public async Task<bool> RateTheEvent(int eventRegisterId, decimal score, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

            try
            {
                var eventRegister = await unitOfWork.ReadRepository<EventRegister>().GetByFiltered
                    (x => x.EventRegisterId == eventRegisterId,
                    q => q.Include(x => x.Event)
                        .ThenInclude(e => e.AppUser), ct);

                if (eventRegister == null)
                {
                    Console.WriteLine("eventRegister null.");
                    return false;
                }

                if (eventRegister.Event == null)
                {
                    Console.WriteLine("eventRegister.Event null.");
                    return false;
                }

                if (eventRegister.Event.AppUser == null)
                {
                    Console.WriteLine("eventRegister.Event.AppUser null.");
                    return false;
                }

                if (eventRegister.IsScored)
                {
                    Console.WriteLine("Etkinlik daha önce puanlanmış.");
                    return false;
                }

                if (score < 0 || score > 10)
                {
                    Console.WriteLine($"Geçersiz puan: {score}");
                    return false;
                }

                var eventCreator = eventRegister.Event.AppUser;

                eventCreator.Score =
                    ((eventCreator.Score * eventCreator.NumberOfRaters) + score) / (eventCreator.NumberOfRaters + 1);
                eventCreator.NumberOfRaters++;

                eventRegister.IsScored = true;

                await unitOfWork.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"HATA VARRRRRRRRRR: {ex.Message}");
                await unitOfWork.RollbackAsync();
                return false;
            }

        }


        public async Task<List<GetMyPastEventsResponse>> GetMyPastEvents(int id, CancellationToken ct)
        {
            var now = DateTime.Now;
            var value = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(

                    x => x.AppUserId == id &&
                    x.Event.EndDate < now &&
                    x.Event.EndDate < now &&
                    x.Event.AppUserId != id,

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
                    x.Event.StartDate < now && x.Event.EndDate > now &&
                    x.Event.StartDate < now && x.Event.EndDate > now &&
                    x.Event.AppUserId != id,

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
                    x.Event.StartDate > now &&
                    x.Event.StartDate > now &&
                    x.Event.AppUserId != id,

                    q => q
                    .Include(x => x.Event)
                    .ThenInclude(e => e.AppUser)
                    .Include(x => x.Event)
                    .ThenInclude(e => e.EventCategories)
                    .ThenInclude(ec => ec.Category),
                    ct);
            return mapper.Map<List<GetMyFutureEventsResponse>>(value);
        }

        public async Task<List<EventForMessageDto>> GetAllEventI_Joined(int userId, CancellationToken ct)
        {
            var evenRegisters = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(
                x => x.AppUserId == userId,
                q => q.Include(x => x.Event),
                ct);

            var events = evenRegisters.Select(er => er.Event).ToList();
            var filteredEvents = events.Where(e => e.StartDate < DateTime.Now).ToList();
            return mapper.Map<List<EventForMessageDto>>(filteredEvents);
        }
    }
}
