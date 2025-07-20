using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Category
{
    public class GetE_F_CategoryRequest:IRequest<GetE_F_CategoryResponse>
    {
        public int AppUserId { get; set; }

        public List<int> Categories { get; set; }
    }
}
