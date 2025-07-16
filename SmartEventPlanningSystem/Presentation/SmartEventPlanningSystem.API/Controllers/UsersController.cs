using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RegisterTheSystem;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IMediator mediator) : ControllerBase
    {
        [HttpPost("RegisterTheSystem")]
        public async Task<IActionResult> RegisterTheSystem([FromBody] RegisterTheSystemRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
