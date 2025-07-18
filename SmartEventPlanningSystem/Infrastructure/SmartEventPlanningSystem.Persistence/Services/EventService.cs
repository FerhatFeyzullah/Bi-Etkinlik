using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Persistence.UnitOfWorks;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class EventService(IUnitOfWork unitOfWork,IMapper mapper) : IEventService
    {
        public async Task CreateEvent(CreateEventDto createEventDto,List<int> Categories, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

                var newEvent = mapper.Map<Event>(createEventDto);
                newEvent.Status = null;


            await unitOfWork.WriteRepository<Event>().AddAsync(newEvent);

                foreach (var categoryId in Categories)
                {
                    var eventCategory = new EventCategory
                    {
                        Event = newEvent, 
                        CategoryId = categoryId
                    };
                    await unitOfWork.WriteRepository<EventCategory>().AddAsync(eventCategory);
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

                await unitOfWork.WriteRepository<Event>().Update(eventToUpdate);
                var oldCategories = await unitOfWork.ReadRepository<EventCategory>().GetByFilteredList(
                    x => x.EventId == eventToUpdate.EventId);

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

        public async Task RemoveEvent(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

            await unitOfWork.WriteRepository<Event>().DeleteAsync(id);
            await unitOfWork.CommitAsync();
        }

        public async Task SetEventPermissionTrue(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var eventToEdit = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id);

            eventToEdit.Status = true;
            await unitOfWork.CommitAsync();
        }

        public async Task SetEventPermissionFalse(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var eventToEdit = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id);

            eventToEdit.Status = false;
            await unitOfWork.CommitAsync();
        }

        public async Task<GetEventsICreatedUnFilteredResponse> GetEventsI_CreatedUnFiltered(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var user = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.AppUserId == id,
                q => q.Include(x => x.EventCategories)
                     .ThenInclude(e => e.Category)
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(user);
            return new GetEventsICreatedUnFilteredResponse
            {
                Events = mappedEvents
            };
        }
    }
}
