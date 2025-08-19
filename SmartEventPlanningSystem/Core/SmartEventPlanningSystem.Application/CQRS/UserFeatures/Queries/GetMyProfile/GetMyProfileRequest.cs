using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile
{
    public class GetMyProfileRequest : IRequest<GetMyProfileResponse>
    {
        public int AppUserId { get; set; }
    }
}
