using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.Services
{
    public interface IForgotPasswordService
    {
        Task<string> SendResetCode(string email,CancellationToken ct);

        Task<bool> VerifyResetCode(string email, string code, CancellationToken ct);
    }
}
