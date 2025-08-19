namespace SmartEventPlanningSystem.Application.Services
{
    public interface IForgotPasswordService
    {
        Task<string> SendResetCode(string email, CancellationToken ct);

        Task<bool> VerifyResetCode(string email, string code, CancellationToken ct);
    }
}
