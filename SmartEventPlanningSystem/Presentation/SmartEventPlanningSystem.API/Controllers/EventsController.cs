using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.CreateEvent;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController(IMediator mediator) : ControllerBase
    {
        [HttpPost("CreateEvent")]
        public async Task<IActionResult>  CreateEvent([FromBody] CreateEventRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
