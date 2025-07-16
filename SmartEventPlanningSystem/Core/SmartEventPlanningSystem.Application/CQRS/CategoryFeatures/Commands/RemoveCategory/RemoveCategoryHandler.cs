using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.RemoveCategory
{
    public class RemoveCategoryHandler(IUnitOfWork unitOfWork) : IRequestHandler<RemoveCategoryRequest, Unit>
    {
        public async Task<Unit> Handle(RemoveCategoryRequest request, CancellationToken cancellationToken)
        {
            await unitOfWork.WriteRepository<Category>().DeleteAsync(request.CategoryId);
            await unitOfWork.CommitAsync();
            return Unit.Value;
        }
    }
}
