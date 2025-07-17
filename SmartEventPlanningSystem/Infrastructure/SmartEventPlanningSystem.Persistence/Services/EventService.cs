using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Persistence.UnitOfWorks;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class EventService(IUnitOfWork unitOfWork) : IEventService
    {
        public async Task CreateEvent(CreateEventDto createEventDto,List<int> Categories, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
                var start = TimeOnly.Parse(createEventDto.StartTime);
                var end = TimeOnly.Parse(createEventDto.EndTime);

                var newEvent = new Event
                {
                    Name = createEventDto.Name,
                    Description = createEventDto.Description,
                    Date = createEventDto.Date,
                    StartTime = start,
                    EndTime = end,
                    Latitude = createEventDto.Latitude,
                    Longitude = createEventDto.Longitude,
                    AppUserId = createEventDto.AppUserId,
                };

                var duration = newEvent.EndTime.ToTimeSpan() - newEvent.StartTime.ToTimeSpan();
                newEvent.EventDuration = duration.ToString(@"hh\:mm");

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
    }
}
