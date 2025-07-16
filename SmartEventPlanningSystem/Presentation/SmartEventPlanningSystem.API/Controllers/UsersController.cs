using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RegisterTheSystem;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UpdateProfile;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IMediator mediator) : ControllerBase
    {
        [HttpGet("GetMyProfile")]
        public async Task<IActionResult> GetMyProfile([FromQuery] GetMyProfileRequest request) 
        {
            return Ok(await mediator.Send(request));       
        }

        [HttpPut("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
