using System.ComponentModel.DataAnnotations.Schema;

namespace SmartEventPlanningSystem.Domain.Entities
{
    public class Event
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


        [Column(TypeName = "timestamp without time zone")]
        public DateTime StartDate { get; set; }
        [Column(TypeName = "timestamp without time zone")]
        public DateTime EndDate { get; set; }

        public bool? Status { get; set; }
        public string City { get; set; }
        public string EventImageId { get; set; }
        public TimeSpan TimeInBetween { get; set; }


        //Location
        [Column(TypeName = "decimal(9,6)")]
        public decimal Latitude { get; set; }

        [Column(TypeName = "decimal(9,6)")]
        public decimal Longitude { get; set; }

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public List<EventCategory> EventCategories { get; set; }
        //public List<Message> Messages { get; set; }


    }
}
