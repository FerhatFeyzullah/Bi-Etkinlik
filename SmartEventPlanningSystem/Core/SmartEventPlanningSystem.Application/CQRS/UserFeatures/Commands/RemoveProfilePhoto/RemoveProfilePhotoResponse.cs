using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveProfilePhoto
{
    public class RemoveProfilePhotoResponse
    {
        public UserProfileDto MyProfile { get; set; }

    }
}
