using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.DeleteEventRegister;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RegisterEvent;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventRegistersController(IMediator mediator) : ControllerBase
    {

        [HttpPost("RegisterEvent")]
        public async Task<IActionResult> RegisterEvent([FromBody] RegisterEventRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpDelete("DeleteEventRegister/{userId}/{eventId}")]
        public async Task<IActionResult> DeleteEventRegister([FromRoute] int userId,int eventId)
        {
            return Ok(await mediator.Send(new DeleteEventRegisterRequest { AppUserId = userId,EventId = eventId}));
        }

        [HttpGet("GetEventsI_Joined")]
        public async Task<IActionResult> GetEventsI_Joined([FromQuery] GetEventsI_JoinedRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
