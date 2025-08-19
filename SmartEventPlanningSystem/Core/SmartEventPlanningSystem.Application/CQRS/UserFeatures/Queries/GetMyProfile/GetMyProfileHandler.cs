using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile
{
    public class GetMyProfileHandler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<GetMyProfileRequest, GetMyProfileResponse>
    {
        public async Task<GetMyProfileResponse> Handle(GetMyProfileRequest request, CancellationToken cancellationToken)
        {
            var user = await unitOfWork.ReadRepository<AppUser>().GetByFiltered(
                x => x.Id == request.AppUserId,
                q => q.Include(x => x.AppUserCategories).
                ThenInclude(e => e.Category));

            var mappedUser = mapper.Map<UserProfileDto>(user);

            return new GetMyProfileResponse
            {
                MyProfile = mappedUser
            };
        }
    }
}
