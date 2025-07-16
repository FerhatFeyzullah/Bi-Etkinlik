using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.CreateCategory;
using SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.RemoveCategory;
using SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Queries.GetAllCategory;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(IMediator mediator) : ControllerBase
    {
        [HttpPost("CreateCategory")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest request) 
        {
            return Ok(await mediator.Send(request));
        }

        [HttpDelete("RemoveCategory")]
        public async Task<IActionResult> RemoveCategory([FromQuery] RemoveCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory([FromQuery] GetAllCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
