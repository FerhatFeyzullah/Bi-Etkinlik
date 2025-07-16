using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IUserService
    {
        Task<UserLoginResponseDto> LoginAsync(UserLoginDto userLoginDto);
        Task<IdentityResult> RegisterAsync(UserRegisterDto userRegisterDto, List<int> interest, CancellationToken c_token);
    }
}
