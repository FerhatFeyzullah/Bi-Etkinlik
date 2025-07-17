using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetUserInfo
{
    public class GetUserInfoRequest:IRequest<GetUserInfoResponse>
    {
        public int AppUserId { get; set; }
    }
}
