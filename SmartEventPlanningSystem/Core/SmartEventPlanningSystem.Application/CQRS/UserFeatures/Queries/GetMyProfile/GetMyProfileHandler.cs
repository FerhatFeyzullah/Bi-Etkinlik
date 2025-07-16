using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.DTOs.CategoryDtos;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile
{
    public class GetMyProfileHandler(IUnitOfWork unitOfWork,IMapper mapper) : IRequestHandler<GetMyProfileRequest, GetMyProfileResponse>
    {
        public async Task<GetMyProfileResponse> Handle(GetMyProfileRequest request, CancellationToken cancellationToken)
        {
            var user = await unitOfWork.ReadRepository<AppUser>().GetByFiltered(x => x.Id == request.AppUserId);
            var appUserCategories = await unitOfWork.ReadRepository<AppUserCategory>().GetByFilteredList(
                x => x.AppUserId == request.AppUserId,
                x=>x.Category
                );
            var categories = appUserCategories.Select(x => x.Category).ToList();

            return new GetMyProfileResponse
            {
                User = mapper.Map<ResultUserDto>(user),
                HisCategory = mapper.Map<List<ResultCategoryDto>>(categories)
            };
        }
    }
}
