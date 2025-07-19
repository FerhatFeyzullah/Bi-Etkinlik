using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_CityCategory
{
    public class GetE_F_CityCategoryHandler(IEventService eventService) : IRequestHandler<GetE_F_CityCategoryRequest, GetE_F_CityCategoryResponse>
    {
        public async Task<GetE_F_CityCategoryResponse> Handle(GetE_F_CityCategoryRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_F_CityCategory(request.Cities,request.Categories, cancellationToken);
        }
    }
}
