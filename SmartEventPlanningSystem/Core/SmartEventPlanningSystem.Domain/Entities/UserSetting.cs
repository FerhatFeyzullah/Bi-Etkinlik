using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Domain.Entities
{
    public class UserSetting
    {
        public string Theme { get; set; } 
        public string ViewMode { get; set; }
        public bool EmailNotification { get; set; }
        public string Language { get; set; }

    }
}
