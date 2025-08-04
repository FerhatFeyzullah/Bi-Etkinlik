using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.DTOs.UserDtos
{
    public class ResultUserForEvent
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? ProfilePhotoId { get; set; }
        public decimal Score { get; set; }
    }
}
