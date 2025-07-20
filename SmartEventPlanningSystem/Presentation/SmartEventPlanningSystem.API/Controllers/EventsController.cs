using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.CreateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.RemoveEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionFalse;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.SetEventPermissionTrue;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.UpdateEvent;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Category;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_City;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_CityCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_Date;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCity;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_F_DateCityCategory;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventDiscovery.GetE_UnFiltered;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedAwaiting;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusFalse;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedStatusTrue;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedUnFiltered;
using SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.GetEventsRecommendedToMe;
using SmartEventPlanningSystem.Application.CQRS.EventRegisterFeatures.Queries.GetEventsI_Joined;

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

        //Events I Created Queries

        [HttpGet("GetEventsI_CreatedUnFiltered")]
        public async Task<IActionResult> GetEventsI_CreatedUnFiltered([FromQuery] GetEventsICreatedUnFilteredRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetEventsI_CreatedAwaiting")]
        public async Task<IActionResult> GetEventsI_CreatedAwaiting([FromQuery] GetEventsICreatedAwaitingRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetEventsI_CreatedStatusTrue")]
        public async Task<IActionResult> GetEventsI_CreatedStatusTrue([FromQuery] GetEventsICreatedStatusTrueRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetEventsI_CreatedStatusFalse")]
        public async Task<IActionResult> GetEventsI_CreatedStatusFalse([FromQuery] GetEventsICreatedStatusFalseRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        //Event Discovrery Queries

        [HttpGet("GetE_UnFiltered")]
        public async Task<IActionResult> GetE_UnFiltered([FromQuery] GetE_UnFilteredRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetE_F_Category")]
        public async Task<IActionResult> GetE_F_Category([FromQuery] GetE_F_CategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetE_F_City")]
        public async Task<IActionResult> GetE_F_City([FromQuery] GetE_F_CityRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetE_F_CityCategory")]
        public async Task<IActionResult> GetE_F_CityCategory([FromQuery] GetE_F_CityCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetE_F_Date")]
        public async Task<IActionResult> GetE_F_Date([FromQuery] GetE_F_DateRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetE_F_DateCategory")]
        public async Task<IActionResult> GetE_F_DateCategory([FromQuery] GetE_F_DateCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetE_F_DateCity")]
        public async Task<IActionResult> GetE_F_DateCity([FromQuery] GetE_F_DateCityRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetE_F_DateCityCategory")]
        public async Task<IActionResult> GetE_F_DateCityCategory([FromQuery] GetE_F_DateCityCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        //Recommended

        [HttpGet("GetEventsRecommendedToMe")]
        public async Task<IActionResult> GetEventsRecommendedToMe([FromQuery] GetEventsRecommendedToMeRequest request)
        {
            return Ok(await mediator.Send(request));
        }
        
    }
}
