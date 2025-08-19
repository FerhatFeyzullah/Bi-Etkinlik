using MediatR;

namespace SmartEventPlanningSystem.Application.CQRS.UserSettingFeatures.Queries.GetUserSetting
{
    public class GetUserSettingRequest : IRequest<GetUserSettingResponse>
    {
        public int AppUserId { get; set; }
    }
}
