using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.LoginTheSystem;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthsController(IMediator mediator) : ControllerBase
    {
        [HttpPost("LoginTheSystem")]
        public async Task<IActionResult> LoginTheSystem([FromBody] LoginTheSystemRequest request)
        {
            var result = await mediator.Send(request);

            if (result.Success)
            {
                if (Request.Cookies.ContainsKey("MyAuthCookie"))
                {
                    Response.Cookies.Delete("MyAuthCookie");
                }

                Response.Cookies.Append("MyAuthCookie", result.Message, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                });
                return Ok(result.Success);
            }
            return Ok(result);
        }

        [Authorize]
        [HttpGet("CheckMe")]
        public IActionResult GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
            {
                return Unauthorized();
            }

            return Ok(new
            {
                UserId = userId,
                Role = role
            });
        }

        [HttpPost("LogoutFromSystem")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("MyAuthCookie");
            return Ok("Çıkış İşlemi Başarılı.");
        }
    }
}
