using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Persistence.Configurations
{
    public class JwtTokenOptions
    {
        public string Issuer { get; set; } //api.smarteventplanning.com
        public string Audience { get; set; } //www.smarteventplanning.com
        public string Key { get; set; }
        public int ExpireInMinutes { get; set; }
    }
}
