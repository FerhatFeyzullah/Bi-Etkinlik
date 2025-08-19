using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ChangePassword
{
    public class ChangePasswordHandler(IUserService userService) : IRequestHandler<ChangePasswordRequest, string>
    {
        public async Task<string> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
        {
            return await userService.ChangePassword(request.AppUserId, request.OldPassword, request.NewPassword, request.ConfirmPassword, cancellationToken);
        }
    }
}
