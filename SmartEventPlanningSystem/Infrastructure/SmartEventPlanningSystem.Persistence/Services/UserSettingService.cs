using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting;
using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Persistence.Services
{
    public class UserSettingService(IUnitOfWork unitOfWork,IMapper mapper) : IUserSettingService
    {
        public async Task<UserSettingDto> GetUserSetting(int id, CancellationToken ct)
        {
            var user = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(id, ct);

            return mapper.Map<UserSettingDto>(user.Settings);

        }

        public async Task<UserSettingDto> UpdateEmailNotification(int id, bool emailNotification, CancellationToken ct)
        {
            var user = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(id, ct);

            user.Settings = new UserSetting
            {
                Theme = user.Settings.Theme,
                ViewMode = user.Settings.ViewMode,
                EmailNotification = emailNotification,
                Language = user.Settings.Language

            };

            await unitOfWork.WriteRepository<AppUser>().Update(user, ct);
            await unitOfWork.CommitAsync();

            return mapper.Map<UserSettingDto>(user.Settings);
        }

        public async Task<UserSettingDto> UpdateLanguage(int id, string language, CancellationToken ct)
        {
            var user = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(id, ct);

            user.Settings = new UserSetting
            {
                Theme = user.Settings.Theme,
                ViewMode = user.Settings.ViewMode,
                EmailNotification = user.Settings.EmailNotification,
                Language = language
            };

            await unitOfWork.WriteRepository<AppUser>().Update(user, ct);
            await unitOfWork.CommitAsync();

            return mapper.Map<UserSettingDto>(user.Settings);
        }

        public async Task<UserSettingDto> UpdateTheme(int id, string theme, CancellationToken ct)
        {
           var user = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(id, ct);

            user.Settings = new UserSetting
            {
                Theme = theme,
                ViewMode = user.Settings.ViewMode,
                EmailNotification = user.Settings.EmailNotification,
                Language = user.Settings.Language
            };

            await unitOfWork.WriteRepository<AppUser>().Update(user, ct);
            await unitOfWork.CommitAsync();

            return mapper.Map<UserSettingDto>(user.Settings);
        }

        public async Task<UserSettingDto> UpdateViewMode(int id, string viewMode, CancellationToken ct)
        {
            var user = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(id, ct);

            user.Settings = new UserSetting
            {
                Theme = user.Settings.Theme,
                ViewMode = viewMode,
                EmailNotification = user.Settings.EmailNotification,
                Language = user.Settings.Language
            };

            await unitOfWork.WriteRepository<AppUser>().Update(user, ct);
            await unitOfWork.CommitAsync();

            return mapper.Map<UserSettingDto>(user.Settings);
        }
    }
}
