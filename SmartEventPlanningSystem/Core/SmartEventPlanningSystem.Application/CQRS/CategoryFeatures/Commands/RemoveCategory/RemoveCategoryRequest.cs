using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.RemoveCategory
{
    public class RemoveCategoryRequest : IRequest<Unit>
    {
        public int CategoryId { get; set; }

    }
}
