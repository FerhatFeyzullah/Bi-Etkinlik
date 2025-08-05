using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.CategoryDtos;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile
{
    public class UpdateProfileResponse
    {
        public UserProfileDto MyProfile { get; set; }
    }
}
