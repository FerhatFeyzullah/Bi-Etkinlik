using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveProfilePhoto
{
    public class RemoveProfilePhotoRequest : IRequest<RemoveProfilePhotoResponse>
    {
        public int AppUserId { get; set; }

    }
}
