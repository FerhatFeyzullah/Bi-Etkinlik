using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.DeleteEventRegister;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RateTheEvent;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Commands.RegisterEvent;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetAllEventsI_Joined;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyCurrentEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyFutureEvents;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetMyPastEvents;

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

        [HttpPut("RateTheEvent")]
        public async Task<IActionResult> RateTheEvent([FromBody] RateTheEventRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetMyPastEvents")]
        public async Task<IActionResult> GetEventsI_Joined([FromQuery] GetMyPastEventsRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetMyFutureEvents")]
        public async Task<IActionResult> GetMyFutureEvents([FromQuery] GetMyFutureEventsRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetMyCurrentEvents")]
        public async Task<IActionResult> GetMyCurrentEvents([FromQuery] GetMyCurrentEventsRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetAllEventsI_Joined")]
        public async Task<IActionResult> GetAllEventsI_Joined([FromQuery] GetAllEventsI_JoinedRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
