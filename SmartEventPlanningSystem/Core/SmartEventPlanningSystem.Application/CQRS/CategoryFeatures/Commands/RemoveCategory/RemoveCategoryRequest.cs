using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Commands.RemoveCategory
{
    public class RemoveCategoryRequest:IRequest<Unit>
    {
        public int CategoryId { get; set; }

    }
}
