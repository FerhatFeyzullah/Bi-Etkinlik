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

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile
{
    public class UpdateProfileHandler(IUnitOfWork unitOfWork,IMapper mapper) : IRequestHandler<UpdateProfileRequest, UpdateProfileResponse>
    {
        public async Task<UpdateProfileResponse> Handle(UpdateProfileRequest request, CancellationToken cancellationToken)
        { 
            cancellationToken.ThrowIfCancellationRequested();
            await unitOfWork.BeginTransactionAsync();
            try
            {
                var user = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(request.UserInfo.AppUserId);
                mapper.Map(request.UserInfo, user); // mevcut entity'ye map
                await unitOfWork.WriteRepository<AppUser>().Update(user);

                var oldCategories = await unitOfWork.ReadRepository<AppUserCategory>().GetByFilteredList(x => x.AppUserId == user.Id);

                await unitOfWork.WriteRepository<AppUserCategory>().DeleteRangeAsync(oldCategories);

                foreach (var cat in request.NewAreas) 
                {
                    await unitOfWork.WriteRepository<AppUserCategory>().AddAsync
                        (
                           new AppUserCategory
                           {
                               AppUserId = user.Id,
                               CategoryId = cat
                           }
                        );
                }
                await unitOfWork.CommitAsync();

                var response = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(user.Id);
                var appUserCategories = await unitOfWork.ReadRepository<AppUserCategory>().GetByFilteredList(
                x => x.AppUserId == user.Id,
                x => x.Category
                );
                var categories = appUserCategories.Select(x => x.Category).ToList();

                return new UpdateProfileResponse
                {
                    User = mapper.Map<ResultUserDto>(response),
                    HisCategory = mapper.Map<List<ResultCategoryDto>>(categories)
                };

            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();

                Console.WriteLine("Profil güncelleme sırasında hata oluştu:");
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);

                return new UpdateProfileResponse
                {
                    User = null,
                    HisCategory = new()
                };
            }




        }
    }
}
