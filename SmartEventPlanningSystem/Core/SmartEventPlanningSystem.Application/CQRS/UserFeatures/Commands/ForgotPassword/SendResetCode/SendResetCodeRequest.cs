using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.SendResetCode
{
    public class SendResetCodeRequest : IRequest<string>
    {
        public string Email { get; set; }
    }
}
