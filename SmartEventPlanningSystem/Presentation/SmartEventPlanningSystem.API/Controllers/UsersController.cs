using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ChangePassword;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ConfirmEmail;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.ChangeForgotPassword;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.SendResetCode;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.VerifyResetCode;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RegisterTheSystem;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveAccount;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveProfilePhoto;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UploadProfilePhoto;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetUserInfo;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IMediator mediator, IWebHostEnvironment _environment) : ControllerBase
    {
        [HttpGet("GetMyProfile")]
        public async Task<IActionResult> GetMyProfile([FromQuery] GetMyProfileRequest request) 
        {
            return Ok(await mediator.Send(request));       
        }

        [HttpGet("GetUserInfo")]
        public async Task<IActionResult> GetUserInfo([FromQuery] GetUserInfoRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("ProfileImage/{*photoPath}")]
        public IActionResult GetProfileImage(string photoPath)
        {
            if (string.IsNullOrWhiteSpace(photoPath) || photoPath.Contains(".."))
                return BadRequest("Geçersiz dosya adı.");

            var filePath = Path.Combine(_environment.WebRootPath, photoPath);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            var contentType = GetContentType(filePath);

            Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
            Response.Headers["Pragma"] = "no-cache";
            Response.Headers["Expires"] = "0";

            return new FileStreamResult(stream, contentType);
        }

        private string GetContentType(string path)
        {
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return ext switch
            {
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };
        }

        [HttpPut("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPut("UploadProfilePhoto")]
        public async Task<IActionResult> UploadProfilePhoto([FromForm] UploadProfilePhotoRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPut("RemoveProfilePhoto/{id}")]
        public async Task<IActionResult> RemoveProfilePhoto([FromRoute] int id)
        {
            return Ok(await mediator.Send(new RemoveProfilePhotoRequest { AppUserId = id}));
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPost("SendResetCode")]
        public async Task<IActionResult> SendResetCode([FromBody] SendResetCodeRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPost("VerifyResetCode")]
        public async Task<IActionResult> VerifyResetCode([FromBody] VerifyResetCodeRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPost("ChangeForgotPassword")]
        public async Task<IActionResult> ChangeForgotPassword([FromBody] ChangeForgotPasswordRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpDelete("RemoveAccount/{id}")]
        public async Task<IActionResult> RemoveAccount([FromRoute] int id)
        {
            return Ok(await mediator.Send( new RemoveAccountRequest { AppUserId = id}));
        }

    }
}
