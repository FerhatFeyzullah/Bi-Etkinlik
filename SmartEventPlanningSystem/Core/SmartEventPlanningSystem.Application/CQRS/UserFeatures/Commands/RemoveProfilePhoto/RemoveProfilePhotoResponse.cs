using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveProfilePhoto
{
    public class RemoveProfilePhotoResponse
    {
        public UserProfileDto MyProfile { get; set; }

    }
}
