using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.ChangeForgotPassword
{
    public class ChangeForgotPasswordHandler(IUserService userService) : IRequestHandler<ChangeForgotPasswordRequest, IdentityResult>
    {
        public Task<IdentityResult> Handle(ChangeForgotPasswordRequest request, CancellationToken cancellationToken)
        {
            return userService.ChangeForgotPassword(request.Email, request.NewPassword, request.ConfirmNewPassword,cancellationToken);
        }
    }
}
