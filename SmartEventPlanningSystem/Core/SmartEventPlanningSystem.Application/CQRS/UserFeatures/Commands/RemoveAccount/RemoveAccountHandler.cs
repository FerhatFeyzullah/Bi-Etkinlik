using MediatR;
using Microsoft.AspNetCore.Identity;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveAccount
{
    public class RemoveAccountHandler(IUserService userService) : IRequestHandler<RemoveAccountRequest, IdentityResult>
    {
        public async Task<IdentityResult> Handle(RemoveAccountRequest request, CancellationToken cancellationToken)
        {
            return await userService.RemoveAccountAsync(request.AppUserId, cancellationToken);
        }
    }
}
