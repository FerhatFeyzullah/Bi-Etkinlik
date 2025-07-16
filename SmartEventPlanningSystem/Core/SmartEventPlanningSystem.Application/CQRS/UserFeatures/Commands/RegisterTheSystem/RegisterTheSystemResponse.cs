using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RegisterTheSystem
{
    public class RegisterTheSystemResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
