using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_City
{
    public class GetE_F_CityRequest:IRequest<GetE_F_CityResponse>
    {
        public List<string> Cities { get; set; }

    }
}
