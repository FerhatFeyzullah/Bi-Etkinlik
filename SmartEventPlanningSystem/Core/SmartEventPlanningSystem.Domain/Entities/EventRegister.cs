using Microsoft.EntityFrameworkCore;

namespace SmartEventPlanningSystem.Domain.Entities
{

    [Index(nameof(EventId), nameof(AppUserId), IsUnique = true)]
    public class EventRegister
    {
        public int EventRegisterId { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
        public bool IsScored { get; set; } = false;
    }
}
