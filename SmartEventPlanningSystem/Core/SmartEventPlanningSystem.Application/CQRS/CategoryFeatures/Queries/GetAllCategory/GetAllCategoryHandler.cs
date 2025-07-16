using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Queries.GetAllCategory
{
    public class GetAllCategoryHandler(IUnitOfWork unitOfWork,IMapper mapper) : IRequestHandler<GetAllCategoryRequest, List<GetAllCategoryResponse>>
    {
        public async Task<List<GetAllCategoryResponse>> Handle(GetAllCategoryRequest request, CancellationToken cancellationToken)
        {
            var values = await unitOfWork.ReadRepository<Category>().GetAllAsync();
            return mapper.Map<List<GetAllCategoryResponse>>(values);
        }
    }
}
