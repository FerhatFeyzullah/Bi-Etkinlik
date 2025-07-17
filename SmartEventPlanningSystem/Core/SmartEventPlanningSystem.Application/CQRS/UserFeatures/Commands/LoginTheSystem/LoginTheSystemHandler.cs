using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.LoginTheSystem
{
    public class LoginTheSystemHandler(IUserService userService,IMapper mapper) : IRequestHandler<LoginTheSystemRequest, LoginTheSystemResponse>
    {
        public async Task<LoginTheSystemResponse> Handle(LoginTheSystemRequest request, CancellationToken cancellationToken)
        {
            var loginDto = mapper.Map<UserLoginDto>(request);
            var response = await userService.LoginAsync(loginDto,cancellationToken);
            return mapper.Map<LoginTheSystemResponse>(response);
        }
    }
}
