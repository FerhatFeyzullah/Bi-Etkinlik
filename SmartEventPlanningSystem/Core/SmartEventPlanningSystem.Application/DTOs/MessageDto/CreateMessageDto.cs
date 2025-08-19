namespace SmartEventPlanningSystem.Application.DTOs.MessageDto
{
    public class CreateMessageDto
    {
        public int AppUserId { get; set; }
        public string Content { get; set; }

        public int EventId { get; set; }
    }
}
