using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCityCategory
{
    public class GetE_F_DateCityCategoryRequest:IRequest<GetE_F_DateCityCategoryResponse>
    {
        public int AppUserId { get; set; }

        public DateOnly Start { get; set; }
        public DateOnly End { get; set; }
        public List<string> Cities { get; set; }
        public List<int> Categories { get; set; }       

    }
}
