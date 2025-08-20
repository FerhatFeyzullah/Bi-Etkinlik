using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ConfirmEmail
{
    public class ConfirmEmailRequest : IRequest<bool>
    {
        public string Email { get; set; }
    }
}
