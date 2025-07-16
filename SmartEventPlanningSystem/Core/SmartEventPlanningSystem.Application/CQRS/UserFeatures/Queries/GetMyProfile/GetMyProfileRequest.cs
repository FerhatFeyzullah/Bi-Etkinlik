using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile
{
    public class GetMyProfileRequest:IRequest<GetMyProfileResponse>
    {
        public int AppUserId { get; set; }
    }
}
