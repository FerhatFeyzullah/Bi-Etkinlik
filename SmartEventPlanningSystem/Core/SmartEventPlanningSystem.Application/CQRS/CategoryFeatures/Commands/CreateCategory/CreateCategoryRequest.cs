using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.CreateCategory
{
    public class CreateCategoryRequest : IRequest<Unit>
    {
        public string CategoryName { get; set; }

    }
}
