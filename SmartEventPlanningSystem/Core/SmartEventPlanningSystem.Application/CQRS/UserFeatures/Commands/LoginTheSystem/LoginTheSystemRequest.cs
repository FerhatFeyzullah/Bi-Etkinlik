using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.LoginTheSystem
{
    public class LoginTheSystemRequest : IRequest<LoginTheSystemResponse>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
