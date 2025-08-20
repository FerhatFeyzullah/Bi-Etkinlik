using Microsoft.AspNetCore.Identity;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IUserService
    {
        Task<UserLoginResponseDto> LoginAsync(UserLoginDto userLoginDto, CancellationToken ct);
        Task<IdentityResult> RegisterAsync(UserRegisterDto userRegisterDto, List<int> interest, CancellationToken c_token);
        Task<string> ChangePassword(int id, string oldpass, string newpass, string confpass, CancellationToken ct);
        Task<IdentityResult> ChangeForgotPassword(string email, string newPass, string confNewPass, CancellationToken ct);
        Task<IdentityResult> RemoveAccountAsync(int id, CancellationToken ct);
        Task<bool> ConfirmEmailAsync(string email, CancellationToken ct);
        Task<AppUser> UploadProfilePhoto(int id, string ppid, CancellationToken ct);
        Task<AppUser> RemoveProfilePhoto(int id, CancellationToken ct);
        Task<UpdateProfileResponse> UpdateProfile(UpdateProfileDto updateProfileDto, List<int> Categories, CancellationToken ct);

    }
}
