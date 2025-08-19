using MediatR;
using Microsoft.AspNetCore.Identity;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ConfirmEmail
{
    public class ConfirmEmailRequest : IRequest<IdentityResult>
    {
        public string Email { get; set; }
    }
}
