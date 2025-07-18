using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RegisterTheSystem
{
    public class RegisterTheSystemHandler(IUserService userService,IMediator mediator) : IRequestHandler<RegisterTheSystemRequest, RegisterTheSystemResponse>
    {
        public async Task<RegisterTheSystemResponse> Handle(RegisterTheSystemRequest request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var result = await userService.RegisterAsync(request.RegisterDto,request.AreasOfInterest,cancellationToken);

            if (result.Succeeded) {
                return
                    new RegisterTheSystemResponse
                    {
                        Success = true,
                        Message = "Yeni Kullanıcı Kaydı Başarıyla Yapıldı.",
                    };      
            }
            return
                new RegisterTheSystemResponse
                {
                    Success = false,
                    Message = result.Errors
                    .Select(e => e.Description)
                    .FirstOrDefault()??""
                };
        }
    }
}
