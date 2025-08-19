using MediatR;
using Microsoft.AspNetCore.Identity;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.ChangeForgotPassword
{
    public class ChangeForgotPasswordRequest : IRequest<IdentityResult>
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}
