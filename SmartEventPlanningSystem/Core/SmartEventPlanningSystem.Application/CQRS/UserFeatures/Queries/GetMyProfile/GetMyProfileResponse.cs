using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile
{
    public class GetMyProfileResponse
    {
        public UserProfileDto MyProfile { get; set; }

    }
}
