using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateEmailNotification;
using SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateLanguageSetting;
using SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateThemeSetting;
using SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Commands.UpdateViewModeSetting;
using SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSettingsController(IMediator mediator) : ControllerBase
    {
        [HttpGet("GetUserSetting")]
        public async Task<IActionResult> GetUserSetting([FromQuery] GetUserSettingRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPut("UpdateThemeSetting")]
        public async Task<IActionResult> UpdateThemeSetting([FromBody] UpdateThemeSettingRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPut("UpdateViewModeSetting")]
        public async Task<IActionResult> UpdateViewModeSetting([FromBody] UpdateViewModeSettingRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPut("UpdateLanguageSetting")]
        public async Task<IActionResult> UpdateLanguageSetting([FromBody] UpdateLanguageSettingRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPut("UpdateEmailNotificationSetting")]
        public async Task<IActionResult> UpdateEmailNotificationSetting([FromBody] UpdateEmailNotificationRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
