using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.CQRS.AppUserCategoryFeatures.Commands.CreateAppUserCategory;
using SmartEventPlanningSystem.Application.DTOs.CategoryDtos;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile
{
    public class UpdateProfileHandler(IUserService userService) : IRequestHandler<UpdateProfileRequest, UpdateProfileResponse>
    {
        public async Task<UpdateProfileResponse> Handle(UpdateProfileRequest request, CancellationToken cancellationToken)
        { 
            return await userService.UpdateProfile(request.UserInfo, request.NewAreas, cancellationToken);

        }
    }
}
