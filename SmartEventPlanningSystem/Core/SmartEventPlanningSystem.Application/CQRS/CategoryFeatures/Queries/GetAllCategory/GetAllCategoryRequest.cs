using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Queries.GetAllCategory
{
    public class GetAllCategoryRequest : IRequest<List<GetAllCategoryResponse>>
    {
       
    }
}
