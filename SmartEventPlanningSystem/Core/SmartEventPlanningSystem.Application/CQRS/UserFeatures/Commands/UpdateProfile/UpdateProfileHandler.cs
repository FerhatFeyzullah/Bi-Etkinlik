using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile
{
    public class UpdateProfileHandler(IUserService userService) : IRequestHandler<UpdateProfileRequest, UpdateProfileResponse>
    {
        public async Task<UpdateProfileResponse> Handle(UpdateProfileRequest request, CancellationToken cancellationToken)
        {
            return await userService.UpdateProfile(request.UserInfo, request.NewAreas, cancellationToken);

        }
    }
}
