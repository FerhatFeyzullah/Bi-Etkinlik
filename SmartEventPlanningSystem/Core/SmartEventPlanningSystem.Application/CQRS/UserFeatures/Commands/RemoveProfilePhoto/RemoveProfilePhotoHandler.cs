using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveProfilePhoto
{
    public class RemoveProfilePhotoHandler(IUserService userService, IMapper mapper) : IRequestHandler<RemoveProfilePhotoRequest, RemoveProfilePhotoResponse>
    {
        public async Task<RemoveProfilePhotoResponse> Handle(RemoveProfilePhotoRequest request, CancellationToken cancellationToken)
        {
            var response = await userService.RemoveProfilePhoto(request.AppUserId, cancellationToken);
            return new RemoveProfilePhotoResponse
            {
                MyProfile = mapper.Map<UserProfileDto>(response)
            };
        }
    }
}
