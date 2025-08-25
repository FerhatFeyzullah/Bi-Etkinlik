using SmartEventPlanningSystem.Application.DTOs.UserDtos;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetAllUsers
{
    public class GetAllUsersResponse
    {
        public List<ResultUserForEvent> Users { get; set; }
    }
}
