using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.CreateCategory;
using SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.RemoveCategory;
using SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Queries.GetAllCategory;

namespace SmartEventPlanningSystem.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(IMediator mediator) : ControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpPost("CreateCategory")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("RemoveCategory")]
        public async Task<IActionResult> RemoveCategory([FromQuery] RemoveCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }

        [AllowAnonymous]
        [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory([FromQuery] GetAllCategoryRequest request)
        {
            return Ok(await mediator.Send(request));
        }
    }
}
