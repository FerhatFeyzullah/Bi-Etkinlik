using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.CQRS.CategoryFeatures.Queries.GetAllCategory
{
    public class GetAllCategoryResponse
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
