using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.CreateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.RemoveEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionFalse;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionTrue;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered;

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

        [HttpPut("UpdateEvent")]
        public async Task<IActionResult> UpdateEvent([FromBody] UpdateEventRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpDelete("RemoveEvent/{id}")]
        public async Task<IActionResult> RemoveEvent([FromRoute] int id)
        {
            return Ok(await mediator.Send(new RemoveEventRequest { EventId = id}));
        }

        [HttpGet("GetEventsI_CreatedUnFiltered")]
        public async Task<IActionResult> GetEventsI_CreatedUnFiltered([FromQuery] GetEventsICreatedUnFilteredRequest request ) 
        {
            return Ok(await mediator.Send(request));
        }

        [HttpPut("SetEventPermissionTrue/{id}")]
        public async Task<IActionResult> SetEventPermissionTrue([FromRoute] int id)
        {
            return Ok(await mediator.Send(new SetEventPermissionTrueRequest { EventId = id }));
        }

        [HttpPut("SetEventPermissionFalse/{id}")]
        public async Task<IActionResult> SetEventPermissionFalse([FromRoute] int id)
        {
            return Ok(await mediator.Send(new SetEventPermissionFalseRequest { EventId = id }));
        }
    }
}
