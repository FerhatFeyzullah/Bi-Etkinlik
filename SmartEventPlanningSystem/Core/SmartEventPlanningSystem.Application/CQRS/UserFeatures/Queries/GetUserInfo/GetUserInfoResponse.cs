using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetUserInfo
{
    public class GetUserInfoResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string? ProfilePhotoId { get; set; }
    }
}
