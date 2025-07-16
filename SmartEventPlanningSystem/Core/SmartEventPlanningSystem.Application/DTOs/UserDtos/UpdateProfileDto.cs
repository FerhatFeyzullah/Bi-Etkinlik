using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.DTOs.UserDtos
{
    public class UpdateProfileDto
    {
        public int AppUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string City { get; set; }
        public DateOnly BirthDate { get; set; }
        public string Gender { get; set; }
    }
}
