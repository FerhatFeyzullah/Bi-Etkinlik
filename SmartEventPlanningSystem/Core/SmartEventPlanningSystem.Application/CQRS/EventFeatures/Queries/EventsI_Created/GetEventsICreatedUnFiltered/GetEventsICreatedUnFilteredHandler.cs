using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered
{
    public class GetEventsICreatedUnFilteredHandler(IEventService eventService) : IRequestHandler<GetEventsICreatedUnFilteredRequest,GetEventsICreatedUnFilteredResponse>
    {
        public async Task<GetEventsICreatedUnFilteredResponse> Handle(GetEventsICreatedUnFilteredRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsI_CreatedUnFiltered(request.AppUserId, cancellationToken);
        }
    }
}
