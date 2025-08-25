using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetAllUsers
{
    public class GetAllUsersHandler(IUserService userService) : IRequestHandler<GetAllUsersRequest, GetAllUsersResponse>
    {
        public async Task<GetAllUsersResponse> Handle(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var users = await userService.GetAllUser(request.AdminId, cancellationToken);

            return new GetAllUsersResponse
            {
                Users = users
            };
        }
    }
}
