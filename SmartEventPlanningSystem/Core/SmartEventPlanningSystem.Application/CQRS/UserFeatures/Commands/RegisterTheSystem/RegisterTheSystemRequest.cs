using MediatR;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RegisterTheSystem
{
    public class RegisterTheSystemRequest : IRequest<RegisterTheSystemResponse>
    {
        public UserRegisterDto RegisterDto { get; set; }

        public List<int> AreasOfInterest { get; set; }


    }
}
