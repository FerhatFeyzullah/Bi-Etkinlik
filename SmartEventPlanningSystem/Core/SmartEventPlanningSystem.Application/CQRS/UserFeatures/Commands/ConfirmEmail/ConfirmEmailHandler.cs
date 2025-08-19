using MediatR;
using Microsoft.AspNetCore.Identity;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ConfirmEmail
{
    public class ConfirmEmailHandler(IUserService userService) : IRequestHandler<ConfirmEmailRequest, IdentityResult>
    {
        public async Task<IdentityResult> Handle(ConfirmEmailRequest request, CancellationToken cancellationToken)
        {
            return await userService.ConfirmEmailAsync(request.Email, cancellationToken);
        }
    }
}
