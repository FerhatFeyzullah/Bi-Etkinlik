using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Category;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_City;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_CityCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Date;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCity;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCityCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_UnFiltered;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedAwaiting;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusFalse;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusTrue;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsRecommendedToMe;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Persistence.UnitOfWorks;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class EventService(IUnitOfWork unitOfWork,IMapper mapper) : IEventService
    {
        public async Task CreateEvent(CreateEventDto createEventDto,List<int> Categories,string filePath, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

                var newEvent = mapper.Map<Event>(createEventDto);
                newEvent.Status = null;
                newEvent.EventImageId = filePath;

            newEvent.TimeInBetween = newEvent.StartDate - DateTime.Now;

            await unitOfWork.WriteRepository<Event>().AddAsync(newEvent,ct);

                foreach (var categoryId in Categories)
                {
                    var eventCategory = new EventCategory
                    {
                        Event = newEvent, 
                        CategoryId = categoryId
                    };
                    await unitOfWork.WriteRepository<EventCategory>().AddAsync(eventCategory,ct);
                }

        }

        public async Task<UpdateEventResponse> UpdateEvent(UpdateEventDto updateEventDto, List<int> Catgeories,int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            await unitOfWork.BeginTransactionAsync();
            try
            {
                var eventToUpdate = await unitOfWork.ReadRepository<Event>().GetByIdAsync(updateEventDto.EventId);
                mapper.Map(updateEventDto,eventToUpdate);
                eventToUpdate.Status = null;


                await unitOfWork.WriteRepository<Event>().Update(eventToUpdate);
                var oldCategories = await unitOfWork.ReadRepository<EventCategory>().GetByFilteredList(
                    x => x.EventId == eventToUpdate.EventId,ct);

                await unitOfWork.WriteRepository<EventCategory>().DeleteRangeAsync(oldCategories);

                foreach (var categoryId in Catgeories)
                {
                    var eventCategory = new EventCategory
                    {
                        EventId = eventToUpdate.EventId,
                        CategoryId = categoryId
                    };
                    await unitOfWork.WriteRepository<EventCategory>().AddAsync(eventCategory);
                }
                await unitOfWork.CommitAsync();

                var updatedEvent = await unitOfWork.ReadRepository<Event>().GetByFilteredList
                    (
                        x => x.AppUserId == id,
                        x=>x.Include(x=>x.EventCategories).
                        ThenInclude(x=>x.Category)
                    );

                return new UpdateEventResponse
                {
                    Events = mapper.Map<List<EventsI_CreatedDto>>(updatedEvent),
                };
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                Console.WriteLine($"hata var reis: {ex.Message}");
                return new UpdateEventResponse
                {
                    Events = null
                };
            }

            
        } 

        public async Task<string> RemoveEvent(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            await unitOfWork.BeginTransactionAsync();
            try { 

                var value = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id, ct);
                var photoPath = value.EventImageId; 

                await unitOfWork.WriteRepository<Event>().DeleteAsync(id,ct);
                await unitOfWork.CommitAsync();
                return photoPath;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                Console.WriteLine($"Event silinirken hata: {ex.Message}");
                return null;
            }

        }

        public async Task SetEventPermissionTrue(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var eventToEdit = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id, ct);

            eventToEdit.Status = true;
            await unitOfWork.CommitAsync();
        }

        public async Task SetEventPermissionFalse(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var eventToEdit = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id, ct);

            eventToEdit.Status = false;
            await unitOfWork.CommitAsync();
        }


        // EventI_Created Queries

        public async Task<GetEventsICreatedUnFilteredResponse> GetEventsI_CreatedUnFiltered(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.AppUserId == id,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x=>x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsICreatedUnFilteredResponse
            {
                Events = mappedEvents
            };
        }

        public async Task<GetEventsICreatedAwaitingResponse> GetEventsI_CreatedAwaiting(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.AppUserId == id &&
                x.Status == null,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsICreatedAwaitingResponse
            {
                Events = mappedEvents
            };
        }

        public async Task<GetEventsICreatedStatusTrueResponse> GetEventsI_CreatedStatusTrue(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.AppUserId == id &&
                x.Status == true,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsICreatedStatusTrueResponse
            {
                Events = mappedEvents
            };
        }

        public async Task<GetEventsICreatedStatusFalseResponse> GetEventsI_CreatedStatusFalse(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.AppUserId == id &&
                x.Status ==false,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsICreatedStatusFalseResponse
            {
                Events = mappedEvents
            };
        }

        // Event Discovery Queries


        private async Task<List<EventsDiscoveryDto>> MarkRegisteredEventsAsync( List<EventsDiscoveryDto> events, int userId, CancellationToken ct)       
        {
            ct.ThrowIfCancellationRequested();

            var registeredEventIds = await unitOfWork.ReadRepository<EventRegister>()
                .GetByFilteredList(x => x.AppUserId == userId, ct);

            var registeredIds = registeredEventIds.Select(x => x.EventId).ToHashSet();

            foreach (var @event in events)
            {
                @event.Registered = registeredIds.Contains(@event.EventId);
            }

            return events;
        }

        public async Task<GetE_UnFilteredResponse> GetE_UnFiltered(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.Status == true,
                q => q.Include(x=>x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .ToList();
           




            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);          

            return new GetE_UnFilteredResponse
            {
                Events = result
            };
        }

        public async Task<GetE_F_CategoryResponse> GetE_F_Category(int id, List<int> categories, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
            x => 
                x.Status == true &&
                x.EventCategories.Any(ec => categories.Contains(ec.CategoryId)),
                 q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetE_F_CategoryResponse
            {
                Events = result
            };
        }

        public async Task<GetE_F_CityResponse> GetE_F_City(int id, List<string> cities, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
            x => 
                x.Status == true &&
               cities.Contains(x.City),
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetE_F_CityResponse
            {
                Events = result
            };
        }

        public async Task<GetE_F_CityCategoryResponse> GetE_F_CityCategory(int id, List<string> cities, List<int> categories, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
            x =>
                x.Status == true &&
                x.EventCategories.Any(ec => categories.Contains(ec.CategoryId)) &&
                cities.Contains(x.City),
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetE_F_CityCategoryResponse
            {
                Events = result
            };
        }

        public async Task<GetE_F_DateResponse> GetE_F_Date(int id, DateOnly Start, DateOnly End, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
            x =>
                x.Status == true &&
                DateOnly.FromDateTime(x.StartDate) >= Start &&
                DateOnly.FromDateTime(x.EndDate) <= End,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetE_F_DateResponse
            {
                Events = result
            };
        }

        public async Task<GetE_F_DateCategoryResponse> GetE_F_DateCategory(int id, DateOnly Start, DateOnly End, List<int> categories, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
            x =>
                x.Status == true &&
                DateOnly.FromDateTime(x.StartDate) >= Start &&
                DateOnly.FromDateTime(x.EndDate) <= End &&
                x.EventCategories.Any(ec=>categories.Contains(ec.CategoryId)),
                 q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetE_F_DateCategoryResponse
            {
                Events = result
            };
        }

        public async Task<GetE_F_DateCityResponse> GetE_F_DateCity(int id, DateOnly Start, DateOnly End, List<string> cities, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
            x =>
                x.Status == true &&
                DateOnly.FromDateTime(x.StartDate) >= Start &&
                DateOnly.FromDateTime(x.EndDate) <= End &&
                cities.Contains(x.City),
                 q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetE_F_DateCityResponse
            {
                Events = result
            };
        }

        public async Task<GetE_F_DateCityCategoryResponse> GetE_F_DateCityCategory(int id, DateOnly Start, DateOnly End, List<string> cities, List<int> categories, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;

            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
            x =>
                x.Status == true &&
                DateOnly.FromDateTime(x.StartDate) >= Start &&
                DateOnly.FromDateTime(x.EndDate) <= End &&
                cities.Contains(x.City) &&
                x.EventCategories.Any(ec => categories.Contains(ec.CategoryId)),
                 q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
               .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
               .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetE_F_DateCityCategoryResponse
            {
                Events = result
            };
        }

        //Recommended

        public async Task<GetEventsRecommendedToMeResponse> GetEventsRecommendedToMe(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;


            var userCategory = await unitOfWork.ReadRepository<AppUserCategory>().GetByFilteredList(
                x => x.AppUserId == id,
                ct: ct
            );

            var area = userCategory.Select(x => x.CategoryId).ToList();

            var userCity = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(id, ct);

            var city = userCity.City;
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x =>
                    x.Status == true &&
                    x.EventCategories.Any(ec => area.Contains(ec.CategoryId)) &&
                    x.City == city,
                 q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
               .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
               .ToList();

            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredEvents);
            result = await MarkRegisteredEventsAsync(result, id, ct);
            return new GetEventsRecommendedToMeResponse
            {
                Events = result
            };

        }
       
    }
}
