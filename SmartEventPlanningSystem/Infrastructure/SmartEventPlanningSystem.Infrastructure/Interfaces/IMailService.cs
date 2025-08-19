namespace SmartEventPlanningSystem.Infrastructure.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(string toEmail, string subject, string body, bool isHtml = false);
    }
}
