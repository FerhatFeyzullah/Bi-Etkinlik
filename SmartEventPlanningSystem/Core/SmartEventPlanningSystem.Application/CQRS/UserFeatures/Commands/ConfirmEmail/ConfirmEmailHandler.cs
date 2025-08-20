using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ConfirmEmail
{
    public class ConfirmEmailHandler(IUserService userService) : IRequestHandler<ConfirmEmailRequest, bool>
    {
        public async Task<bool> Handle(ConfirmEmailRequest request, CancellationToken cancellationToken)
        {
            return await userService.ConfirmEmailAsync(request.Email, cancellationToken);
        }
    }
}
