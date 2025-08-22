using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Category;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_City;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_CityCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Date;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCity;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCityCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_UnFiltered;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedForArchive;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusFalse;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusNull;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsByStatus.GetEventsStatusTrue;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsRecommendedToMe;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class EventService(IUnitOfWork unitOfWork, IMapper mapper, IMailService mailService) : IEventService
    {
        public async Task CreateEvent(CreateEventDto createEventDto, List<int> Categories, string filePath, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

            var newEvent = mapper.Map<Event>(createEventDto);
            newEvent.Status = null;
            newEvent.EventImageId = filePath;

            newEvent.TimeInBetween = newEvent.StartDate - DateTime.Now;

            await unitOfWork.WriteRepository<Event>().AddAsync(newEvent, ct);

            foreach (var categoryId in Categories)
            {
                var eventCategory = new EventCategory
                {
                    Event = newEvent,
                    CategoryId = categoryId
                };
                await unitOfWork.WriteRepository<EventCategory>().AddAsync(eventCategory, ct);
            }

        }

        public async Task<UpdateEventResponse> UpdateEvent(UpdateEventDto updateEventDto, List<int> Catgeories, int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            await unitOfWork.BeginTransactionAsync();
            try
            {
                var eventToUpdate = await unitOfWork.ReadRepository<Event>().GetByIdAsync(updateEventDto.EventId);
                mapper.Map(updateEventDto, eventToUpdate);
                eventToUpdate.Status = null;


                await unitOfWork.WriteRepository<Event>().Update(eventToUpdate);
                var oldCategories = await unitOfWork.ReadRepository<EventCategory>().GetByFilteredList(
                    x => x.EventId == eventToUpdate.EventId, ct);

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
                        x => x.Include(x => x.EventCategories).
                        ThenInclude(x => x.Category)
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
            try
            {

                var deletedEvent = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id, ct);
                var photoPath = deletedEvent.EventImageId;

                await unitOfWork.WriteRepository<Event>().DeleteAsync(id, ct);

                var registeredUsers = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(x => x.EventId == id,
                    q => q.Include(x => x.AppUser)
                    .Include(x => x.Event),
                    ct);

                if (registeredUsers.Any())
                {
                    await unitOfWork.WriteRepository<EventRegister>().DeleteRangeAsync(registeredUsers, ct);
                }

                var confirmedUsers = registeredUsers.Where(x => x.AppUser.Settings.EmailNotification == true).ToList();

                if (confirmedUsers.Any())
                {
                    foreach (var ev in confirmedUsers)
                    {
                        string htmlBody = $@"
                            <html>
                              <body style='font-family: ""Segoe UI"", Tahoma, Geneva, Verdana, sans-serif; color: #444; line-height:1.6;'>
                                <div style='max-width:600px; margin:auto; padding:20px; border:1px solid #e0e0e0; border-radius:10px;'>
                                  <h2 style='color:#d9534f; font-weight:600;'>Önemli Duyuru</h2>
                                  <p>Merhaba <strong>{ev.AppUser.UserName}</strong>,</p>
                                  <p>Kaydınızı yaptığınız <strong>{ev.Event.Name}</strong> etkinliği, etkinlik sahibi tarafından iptal edilmiştir.</p>
                                  <p>Bazen planlar değişebilir, bu yüzden etkinlik planlandığı tarihte gerçekleşmeyecektir.</p>
                                  <p>Sizi hayal kırıklığına uğrattığımız için üzgünüz 🙏. Ancak yeni deneyimler için sizi uygulamamızda bekleyen birçok farklı etkinlik bulunuyor.</p>
                                  <p><a href='https://www.bietkinlik.com' style='color:#d9534f; font-weight:bold; text-decoration:none;'>Buraya tıklayarak güncel etkinlikleri inceleyebilirsiniz</a>.</p>
                                  <br/>
                                  <p>Destek ve anlayışınız için teşekkür ederiz. Sizleri en kısa sürede farklı etkinliklerde görmek dileğiyle!</p>
                                  <p style='margin-top:20px;'>Sevgiler,<br/><strong>[Bi Etkinlik] Ekibi</strong></p>
                                </div>
                              </body>
                            </html>";
                        await mailService.SendEmailAsync(ev.AppUser.Email, "Etkinlik İptal Edildi", htmlBody, isHtml: true);

                    }
                }

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
            await unitOfWork.CommitAsync();
            await unitOfWork.BeginTransactionAsync();
            try
            {
                var eventToEdit = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id, ct);

                eventToEdit.Status = true;

                var isCreatorRegistered = await unitOfWork.ReadRepository<EventRegister>().GetByFiltered(
                    x => x.EventId == id &&
                    x.AppUserId == eventToEdit.AppUserId, ct
                    );

                if (isCreatorRegistered == null)
                {
                    var register = new EventRegister
                    {
                        AppUserId = eventToEdit.AppUserId,
                        EventId = id,
                    };
                    await unitOfWork.WriteRepository<EventRegister>().AddAsync(register, ct);
                }


                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                Console.WriteLine("HATA VARRRRRRRRRRRRRR" + ex);
            }

        }

        public async Task SetEventPermissionFalse(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

            await unitOfWork.BeginTransactionAsync();
            try
            {
                var eventToEdit = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id, ct);

                eventToEdit.Status = false;

                var registeredUsers = await unitOfWork.ReadRepository<EventRegister>().GetByFilteredList(x => x.EventId == id,
                    q => q.Include(x => x.AppUser)
                    .Include(x => x.Event),
                    ct);

                var confirmedUsers = registeredUsers.Where(x => x.AppUser.Settings.EmailNotification == true).ToList();

                if (confirmedUsers.Any())
                {
                    foreach (var ev in confirmedUsers)
                    {
                        string htmlBody = $@" <html>
                          <body style='font-family: \""Segoe UI\"", Tahoma, Geneva, Verdana, sans-serif; color: #444; line-height:1.6;'>
                            <div style='max-width:600px; margin:auto; padding:20px; border:1px solid #e0e0e0; border-radius:10px;'>
                              <h2 style='color:#d9534f; font-weight:600;'>Etkinlik Güncellemesi</h2>
                              <p>Merhaba <strong>{ev.AppUser.UserName}</strong>,</p>
                              <p>Maalesef, katıldığınız <strong>{ev.Event.Name}</strong> etkinliği, uygulamamızın yaptığı değerlendirmeler sonucunda yayından kaldırıldı.</p>
                              <p>Bu nedenle etkinlik planlandığı gibi gerçekleşmeyecek.</p>
                              <p>💡 Ancak merak etmeyin! Güncel ve onaylı etkinlikleri keşfetmek için <a href='https://www.bietkinlik.com' style='color:#d9534f; text-decoration:none;'>uygulamamızı ziyaret edebilirsiniz</a>.</p>
                              <br/>
                              <p>Size her zaman güvenli ve keyifli bir deneyim sunmayı amaçlıyoruz. Anlayışınız için teşekkür ederiz.</p>
                              <p style='margin-top:20px;'>Sevgilerimizle,<br/><strong>[Bi Etkinlik] Ekibi</strong></p>
                            </div>
                          </body>
                        </html>";
                        await mailService.SendEmailAsync(ev.AppUser.Email, "Katıldığınız Etkinlik Kaldırıldı", htmlBody, isHtml: true);
                    }
                }

                if (registeredUsers.Any())
                {
                    await unitOfWork.WriteRepository<EventRegister>().DeleteRangeAsync(registeredUsers, ct);
                }

                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                Console.WriteLine("HATA VARRRRRRRRRRRRRR" + ex);
            }
        }

        public async Task<bool> IsEventFinished(int id, CancellationToken ct)
        {
            var now = DateTime.Now;
            var theEvent = await unitOfWork.ReadRepository<Event>().GetByIdAsync(id, ct);

            if (theEvent.EndDate < now)
            {
                return true;
            }
            else
            {
                return false;

            }
        }

        // EventI_Created Queries

        public async Task<GetEventsICreatedUnFilteredResponse> GetEventsI_CreatedUnFiltered(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.AppUserId == id &&
                x.StartDate > now,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsICreatedUnFilteredResponse
            {
                Events = mappedEvents
            };
        }
        public async Task<GetEventsICreatedForArchiveResponse> GetEventsI_CreatedForArchive(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var now = DateTime.Now;
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.AppUserId == id,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsICreatedForArchiveResponse
            {
                Events = mappedEvents
            };
        }

        public async Task<GetEventsStatusNullResponse> GetEventsStatusNull(CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.Status == null,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsStatusNullResponse
            {
                Events = mappedEvents
            };
        }

        public async Task<GetEventsStatusTrueResponse> GetEventsStatusTrue(CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.Status == true,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsStatusTrueResponse
            {
                Events = mappedEvents
            };
        }

        public async Task<GetEventsStatusFalseResponse> GetEventsStatusFalse(CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var allEvents = await unitOfWork.ReadRepository<Event>().GetByFilteredList(
                x => x.Status == false,
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );
            var mappedEvents = mapper.Map<List<EventsI_CreatedDto>>(allEvents);
            return new GetEventsStatusFalseResponse
            {
                Events = mappedEvents
            };
        }

        // Event Discovery Queries


        private async Task<List<EventsDiscoveryDto>> MarkRegisteredEventsAsync(List<EventsDiscoveryDto> events, int userId, CancellationToken ct)
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
                q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
                .ToList();

            var filteredFromCreated = filteredEvents
                .Where(x => x.AppUserId != id)
                .ToList();





            var result = mapper.Map<List<EventsDiscoveryDto>>(filteredFromCreated);
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
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
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
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
                .ToList();

            var filteredFromCreated = filteredEvents
                .Where(x => x.AppUserId != id)
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
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
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

            var filteredEvents = allEvents.Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
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
                x.EventCategories.Any(ec => categories.Contains(ec.CategoryId)),
                 q => q.Include(x => x.AppUser)
                .Include(x => x.EventCategories)
                      .ThenInclude(e => e.Category).OrderByDescending(x => x.EventId),
                ct
            );

            var filteredEvents = allEvents
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12))
                .Where(x => x.StartDate - now >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
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
                .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
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
               .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
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
               .Where(x => (x.StartDate - now) >= TimeSpan.FromTicks(x.TimeInBetween.Ticks / 12) && x.AppUserId != id)
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
