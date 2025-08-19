using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UploadProfilePhoto
{
    public class UploadProfilePhotoResponse
    {
        public UserProfileDto MyProfile { get; set; }

    }
}
