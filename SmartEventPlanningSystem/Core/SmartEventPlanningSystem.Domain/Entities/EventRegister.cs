<<<<<<< HEAD
﻿using System;
=======
﻿using Microsoft.EntityFrameworkCore;
using System;
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Domain.Entities
{
<<<<<<< HEAD
=======
    [Index(nameof(EventId), nameof(AppUserId), IsUnique = true)]
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
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
