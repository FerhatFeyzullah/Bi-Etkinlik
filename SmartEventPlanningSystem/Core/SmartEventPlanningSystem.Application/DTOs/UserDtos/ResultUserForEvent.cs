namespace SmartEventPlanningSystem.Application.DTOs.UserDtos
{
    public class ResultUserForEvent
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string? ProfilePhotoId { get; set; }
        public decimal Score { get; set; }
    }
}
