using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile
{
    public class UpdateProfileRequest:IRequest<UpdateProfileResponse>
    {
        public UpdateProfileDto UserInfo { get; set; }
        public List<int> NewAreas { get; set; }
    }
}
