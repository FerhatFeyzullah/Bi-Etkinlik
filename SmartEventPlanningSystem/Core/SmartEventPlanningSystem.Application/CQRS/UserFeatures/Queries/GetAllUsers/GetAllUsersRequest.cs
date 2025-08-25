using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetAllUsers
{
    public class GetAllUsersRequest : IRequest<GetAllUsersResponse>
    {
        public int AdminId { get; set; }
    }
}
