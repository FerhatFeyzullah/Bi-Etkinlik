using MediatR;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.CreateCategory
{
    public class CreateCategoryHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateCategoryRequest, Unit>
    {
        public async Task<Unit> Handle(CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = new Category
            {
                CategoryName = request.CategoryName
            };
            await unitOfWork.WriteRepository<Category>().AddAsync(category);
            await unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}
