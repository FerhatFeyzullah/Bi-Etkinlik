using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting;
using SmartEventPlanningSystem.Application.DTOs.UserSettingDtos;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IUserSettingService
    {
        Task<UserSettingDto> GetUserSetting(int id, CancellationToken ct);
        Task<UserSettingDto> UpdateTheme(int id, string theme, CancellationToken ct);
        Task<UserSettingDto> UpdateViewMode(int id, string viewMode, CancellationToken ct);
        Task<UserSettingDto> UpdateEmailNotification(int id, bool emailNotification, CancellationToken ct);
        Task<UserSettingDto> UpdateLanguage(int id, string language, CancellationToken ct);
    }
}
