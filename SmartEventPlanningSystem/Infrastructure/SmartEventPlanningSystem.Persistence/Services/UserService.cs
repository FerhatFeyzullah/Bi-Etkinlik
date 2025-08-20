using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class UserService(UserManager<AppUser> userManager, IJwtService jwtService, IMapper mapper, IMediator mediator, IUnitOfWork unitOfWork, IFileStorageService fileStorageService, IWebHostEnvironment _environment) : IUserService
    {

        public async Task<string> ChangePassword(int id, string oldPass, string newPass, string confPass, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var user = await userManager.FindByIdAsync(id.ToString());

            var resultMessage = "";

            bool isOldPasswordValid = await userManager.CheckPasswordAsync(user, oldPass);
            if (!isOldPasswordValid)
            {
                return resultMessage = "Eski şifre yanlış";
            }
            if (newPass != confPass)
            {
                return resultMessage = "Yeni şifreler eşleşmiyor";
            }

            await userManager.ChangePasswordAsync(user, oldPass, newPass);
            return resultMessage = "";
        }

        public async Task<IdentityResult> ChangeForgotPassword(string email, string newPass, string confNewPass, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var user = await userManager.FindByEmailAsync(email);
            //Bu Kontrol Sadece Backend Icindir.
            if (newPass != confNewPass)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Yeni şifreler eşleşmiyor" });
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var result = await userManager.ResetPasswordAsync(user, token, newPass);
            if (!result.Succeeded)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Sifre Guncellenemedi" });

            }
            return result;

        }

        public async Task<UserLoginResponseDto> LoginAsync(UserLoginDto userLoginDto, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
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

        public async Task<IdentityResult> RegisterAsync(UserRegisterDto userRegisterDto, List<int> interest, CancellationToken c_token)
        {
            c_token.ThrowIfCancellationRequested();
            await unitOfWork.BeginTransactionAsync();
            try
            {
                var userNameExist = await userManager.FindByNameAsync(userRegisterDto.UserName);
                if (userNameExist != null)
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

                user.Settings = new UserSetting
                {
                    Theme = "light",
                    ViewMode = "classic",
                    EmailNotification = false,
                    Language = "tr",
                };

                var createResult = await userManager.CreateAsync(user, userRegisterDto.Password);
                if (createResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "User");

                    foreach (var area in interest)
                    {
                        var appUserCategory = new AppUserCategory
                        {
                            AppUser = user,
                            CategoryId = area
                        };
                        await unitOfWork.WriteRepository<AppUserCategory>().AddAsync(appUserCategory, c_token);
                    }

                    await unitOfWork.CommitAsync();
                    return createResult;
                }
                else
                {
                    return IdentityResult.Failed(new IdentityError
                    {
                        Description = "Kullanıcı Oluşturulamadı." + createResult
                    });
                }

            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                return IdentityResult.Failed(new IdentityError
                {
                    Description = "Kayit sırasında hata oluştu:" + ex.Message
                });
            }
        }

        public async Task<IdentityResult> RemoveAccountAsync(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var user = await userManager.FindByIdAsync(id.ToString());
            if (user != null)
            {
                var photoPath = user.ProfilePhotoId;
                var result = await userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    await fileStorageService.DeleteImage(photoPath);
                    return IdentityResult.Success;
                }
                else
                {
                    return IdentityResult.Failed(new IdentityError
                    {
                        Description = "Kullanıcı Silinemedi."
                    });
                }
            }
            else
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Description = "Kullanıcı Bulunamadı."
                });


            }
        }

        public async Task<bool> ConfirmEmailAsync(string email, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }

            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var result = await userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        public async Task<AppUser> UploadProfilePhoto(int id, string ppid, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

            var user = await userManager.FindByIdAsync(id.ToString());
            if (user == null)
                throw new KeyNotFoundException("User not found");

            var oldPpId = user.ProfilePhotoId;
            await fileStorageService.DeleteImage(oldPpId);

            user.ProfilePhotoId = ppid;

            await unitOfWork.WriteRepository<AppUser>().Update(user);
            await unitOfWork.CommitAsync();

            var newUSer = await unitOfWork.ReadRepository<AppUser>().GetByFiltered(
                x => x.Id == user.Id,
                x => x.Include(u => u.AppUserCategories).ThenInclude(uc => uc.Category), ct
            );

            return newUSer;
        }

        public async Task<AppUser> RemoveProfilePhoto(int id, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();

            var user = await userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var oldFilePath = user.ProfilePhotoId;

            await fileStorageService.DeleteImage(oldFilePath);

            user.ProfilePhotoId = null;

            await unitOfWork.WriteRepository<AppUser>().Update(user);
            await unitOfWork.CommitAsync();

            var newUSer = await unitOfWork.ReadRepository<AppUser>().GetByFiltered(
                x => x.Id == user.Id,
                x => x.Include(u => u.AppUserCategories).ThenInclude(uc => uc.Category), ct
            );

            return newUSer;
        }

        public async Task<UpdateProfileResponse> UpdateProfile(UpdateProfileDto updateProfileDto, List<int> Categories, CancellationToken ct)
        {
            ct.ThrowIfCancellationRequested();
            await unitOfWork.BeginTransactionAsync();
            try
            {
                var user = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(updateProfileDto.AppUserId, ct);
                mapper.Map(updateProfileDto, user); // mevcut entity'ye map
                await unitOfWork.WriteRepository<AppUser>().Update(user);

                var oldCategories = await unitOfWork.ReadRepository<AppUserCategory>().GetByFilteredList(x => x.AppUserId == user.Id, ct);

                await unitOfWork.WriteRepository<AppUserCategory>().DeleteRangeAsync(oldCategories);

                foreach (var area in Categories)
                {
                    var appUserCategory = new AppUserCategory
                    {
                        AppUser = user,
                        CategoryId = area
                    };
                    await unitOfWork.WriteRepository<AppUserCategory>().AddAsync(appUserCategory, ct);
                }

                await unitOfWork.CommitAsync();

                //Guncelleme Sonrasi Yeni Veri Islemleri

                var updatedUser = await unitOfWork.ReadRepository<AppUser>().GetByFiltered(
                    x => x.Id == user.Id,
                    x => x.Include(u => u.AppUserCategories).ThenInclude(uc => uc.Category), ct

                    );

                return new UpdateProfileResponse
                {
                    MyProfile = mapper.Map<UserProfileDto>(updatedUser),
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
                    MyProfile = null,
                };
            }
        }
    }
}
