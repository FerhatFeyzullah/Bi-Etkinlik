using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UploadProfilePhoto
{
    public class UploadProfilePhotoHandler(IFileStorageService fileStorageService,IUserService userService,IMapper mapper) : IRequestHandler<UploadProfilePhotoRequest, UploadProfilePhotoResponse>
    {
        public async Task<UploadProfilePhotoResponse> Handle(UploadProfilePhotoRequest request, CancellationToken cancellationToken)
        {
            var ppId = await fileStorageService.UploadImage(request.Image);
            var response = await userService.UploadProfilePhoto(request.AppUserId,ppId, cancellationToken);
            return mapper.Map<UploadProfilePhotoResponse>(response);
        }
    }
}
