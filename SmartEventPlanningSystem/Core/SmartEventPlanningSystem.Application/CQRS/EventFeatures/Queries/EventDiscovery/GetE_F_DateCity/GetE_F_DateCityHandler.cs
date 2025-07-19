using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCity
{
    public class GetE_F_DateCityHandler(IEventService eventService) : IRequestHandler<GetE_F_DateCityRequest, GetE_F_DateCityResponse>
    {
        public async Task<GetE_F_DateCityResponse> Handle(GetE_F_DateCityRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetE_F_DateCity(request.Start, request.End, request.Cities, cancellationToken);
        }
    }
}
