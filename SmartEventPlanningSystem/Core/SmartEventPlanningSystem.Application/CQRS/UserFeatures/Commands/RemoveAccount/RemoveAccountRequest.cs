using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.RemoveAccount
{
    public class RemoveAccountRequest:IRequest<IdentityResult>
    {
        public int AppUserId { get; set; }
    }
}
