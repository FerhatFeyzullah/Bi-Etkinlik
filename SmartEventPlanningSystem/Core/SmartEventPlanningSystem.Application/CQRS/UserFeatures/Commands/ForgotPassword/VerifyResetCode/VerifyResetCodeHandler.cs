using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.VerifyResetCode
{
    public class VerifyResetCodeHandler(IForgotPasswordService forgotPasswordService) : IRequestHandler<VerifyResetCodeRequest, bool>
    {
        public async Task<bool> Handle(VerifyResetCodeRequest request, CancellationToken cancellationToken)
        {
            return await forgotPasswordService.VerifyResetCode(request.Email, request.VerifyCode, cancellationToken);
        }
    }
}
