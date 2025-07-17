using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ConfirmEmail
{
    public class ConfirmEmailRequest:IRequest<IdentityResult>
    {
        public string Email { get; set; }
    }
}
