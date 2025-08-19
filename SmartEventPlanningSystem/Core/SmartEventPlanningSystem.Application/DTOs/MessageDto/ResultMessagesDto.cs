namespace SmartEventPlanningSystem.Application.DTOs.MessageDto
{
    public class ResultMessagesDto
    {
        public int MessageId { get; set; }
        public string UserName { get; set; }

        public string Content { get; set; }
        public DateTime SendingTime { get; set; }

    }
}
