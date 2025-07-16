using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using SmartEventPlanningSystem.Application.CQRS.AppUserCategoryFeatures.Commands.CreateAppUserCategory;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class UserService(UserManager<AppUser> userManager,IJwtService jwtService, IMapper mapper,IMediator mediator) : IUserService
    {
        public async Task<UserLoginResponseDto> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await userManager.FindByNameAsync(userLoginDto.UserName);
            if (user == null)
            {
                return new UserLoginResponseDto
                {
                    Success = false,
                    Message = "Kullanıcı Bulunamadı."
                };
               
            }

            var result = await userManager.CheckPasswordAsync(user, userLoginDto.Password);
            if (!result)
            {
                return new UserLoginResponseDto
                {
                    Success = false,
                    Message = "Hatalı Şifre Girişi"
                };
            }

            var token = await jwtService.CreateTokenAsync(user);
            return new UserLoginResponseDto
            {
                Success = true,
                Message = token
            };
        }

        public async Task<IdentityResult> RegisterAsync(UserRegisterDto userRegisterDto,List<int>interest, CancellationToken c_token)
        {            
            c_token.ThrowIfCancellationRequested();

            var userNameExist = await userManager.FindByNameAsync(userRegisterDto.UserName);
            if (userNameExist!=null)
            { 
            return IdentityResult.Failed(new IdentityError
            {
                Description = "Bu Kullanıcı İsmi Zaten Kullanılıyor."
            });
            }
            var userEmailExist = await userManager.FindByEmailAsync(userRegisterDto.Email);
            if (userEmailExist != null)
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Description = "Bu Email Adresi Zaten Kullanılıyor."
                });
            }

            var user = mapper.Map<AppUser>(userRegisterDto);

           var createResult =  await userManager.CreateAsync(user, userRegisterDto.Password);
            if (createResult.Succeeded)
            { 
                await userManager.AddToRoleAsync(user, "User");
                var lastUser = await userManager.FindByNameAsync(userRegisterDto.UserName);
 
                await mediator.Publish(new CreateAppUserCategoryNotification
                {
                    AreasOfInterest = interest,
                    AppUserId = lastUser.Id,

                });
                return createResult;
            }
            return createResult;

        }
    }
}
