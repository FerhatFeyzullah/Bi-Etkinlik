using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveProfilePhoto
{
    public class RemoveProfilePhotoHandler(IUserService userService,IMapper mapper) : IRequestHandler<RemoveProfilePhotoRequest, RemoveProfilePhotoResponse>
    {
        public async Task<RemoveProfilePhotoResponse> Handle(RemoveProfilePhotoRequest request, CancellationToken cancellationToken)
        {
            var response = await userService.RemoveProfilePhoto(request.AppUserId,cancellationToken);
            return mapper.Map<RemoveProfilePhotoResponse>(response);
        }
    }
}
