using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Domain.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public List<AppUserCategory> AppUserCategories { get; set; }
        public List<EventCategory> EventCategories { get; set; }
    }
}
