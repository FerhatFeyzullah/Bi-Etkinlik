using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.MessageFeatures.Queries.GetMessagesForEvent;


namespace SmartEventPlanningSystem.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController(IMediator mediator) : ControllerBase
    {
        //[HttpPost("CreateMessage")]
        //public async Task<IActionResult> CreateMessage([FromBody] CreateMessageNotification request)
        //{
        //    return Ok(await mediator.Send(request));
        //}

        [HttpGet("GetOldMessages")]
        public async Task<IActionResult> GetMessages([FromQuery] GetMessagesForEventRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
