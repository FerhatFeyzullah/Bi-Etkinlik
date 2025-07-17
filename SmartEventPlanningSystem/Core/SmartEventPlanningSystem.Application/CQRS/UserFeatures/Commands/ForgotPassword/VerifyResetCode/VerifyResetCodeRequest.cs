using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.ForgotPassword.VerifyResetCode
{
    public class VerifyResetCodeRequest:IRequest<bool>
    {
        public string Email { get; set; }
        public string VerifyCode { get; set; }
    }
}
