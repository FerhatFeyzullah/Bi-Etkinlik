using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCategory
{
    public class GetE_F_DateCategoryRequest:IRequest<GetE_F_DateCategoryResponse>
    {
        public DateOnly Start { get; set; }
        public DateOnly End { get; set; }
        public List<int> Categories { get; set; }
    }
}
