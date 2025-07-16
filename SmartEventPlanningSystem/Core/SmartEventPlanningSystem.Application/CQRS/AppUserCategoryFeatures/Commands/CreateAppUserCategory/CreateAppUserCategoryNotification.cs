using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.AppUserCategoryFeatures.Commands.CreateAppUserCategory
{
    public class CreateAppUserCategoryNotification:INotification
    {
        public List<int> AreasOfInterest { get; set; }
        public int AppUserId { get; set; }

    }
}
