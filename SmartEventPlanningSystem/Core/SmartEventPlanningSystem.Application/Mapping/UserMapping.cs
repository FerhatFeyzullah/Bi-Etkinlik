using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.LoginTheSystem;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveProfilePhoto;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UploadProfilePhoto;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetUserInfo;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Mapping
{
    public class UserMapping:Profile
    {
        public UserMapping()
        {
            CreateMap<AppUser, UserRegisterDto>().ReverseMap();
            CreateMap<UserLoginDto, LoginTheSystemRequest>().ReverseMap();
            CreateMap<UserLoginResponseDto, LoginTheSystemResponse>().ReverseMap();

            CreateMap<AppUser, ResultUserDto>().ReverseMap();
            CreateMap<AppUser, ResultUserForEvent>().ReverseMap();
            CreateMap<AppUser, UpdateProfileDto>().ReverseMap();
            CreateMap<AppUser, GetMyProfileResponse>().ReverseMap();

            CreateMap<AppUser, UploadProfilePhotoResponse>().ReverseMap();
            CreateMap<AppUser, RemoveProfilePhotoResponse>().ReverseMap();
            CreateMap<AppUser, UserProfileDto>().ReverseMap();

        }
    }
}
