using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined;
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

        //EventI_Created Queries
        Task<GetEventsICreatedUnFilteredResponse> GetEventsI_CreatedUnFiltered(int id, CancellationToken ct);
        Task<GetEventsICreatedAwaitingResponse> GetEventsI_CreatedAwaiting(int id, CancellationToken ct);
        Task<GetEventsICreatedStatusTrueResponse> GetEventsI_CreatedStatusTrue(int id, CancellationToken ct);
        Task<GetEventsICreatedStatusFalseResponse> GetEventsI_CreatedStatusFalse(int id, CancellationToken ct);

        //Event Discovery Queries

        Task<GetE_UnFilteredResponse> GetE_UnFiltered(int id, CancellationToken ct);
        Task<GetE_F_CategoryResponse> GetE_F_Category(int id, List<int> categories, CancellationToken ct);
        Task<GetE_F_CityResponse> GetE_F_City(int id, List<string> cities,CancellationToken ct);
        Task<GetE_F_CityCategoryResponse> GetE_F_CityCategory(int id, List<string> cities, List<int> categories, CancellationToken ct);
        Task<GetE_F_DateResponse> GetE_F_Date(int id, DateOnly Start,DateOnly End,CancellationToken ct);
        Task<GetE_F_DateCategoryResponse> GetE_F_DateCategory(int id, DateOnly Start, DateOnly End, List<int> categories, CancellationToken ct);
        Task<GetE_F_DateCityResponse> GetE_F_DateCity(int id, DateOnly Start, DateOnly End, List<string> cities, CancellationToken ct);
        Task<GetE_F_DateCityCategoryResponse> GetE_F_DateCityCategory(int id, DateOnly Start, DateOnly End, List<string> cities, List<int> categories, CancellationToken ct);

        //Recommended

        Task<GetEventsRecommendedToMeResponse> GetEventsRecommendedToMe(int id, CancellationToken ct);


    }
}
