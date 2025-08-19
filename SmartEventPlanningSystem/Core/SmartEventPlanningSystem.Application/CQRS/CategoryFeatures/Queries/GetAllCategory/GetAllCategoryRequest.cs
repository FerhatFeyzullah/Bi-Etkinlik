using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Queries.GetAllCategory
{
    public class GetAllCategoryRequest : IRequest<List<GetAllCategoryResponse>>
    {

    }
}
