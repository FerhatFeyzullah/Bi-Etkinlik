namespace SmartEventPlanningSystem.Application.DTOs.EventDtos
{
    public class CreateEventDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string City { get; set; }

        // Location
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public int AppUserId { get; set; }
    }
}
