using MediatR;
using Microsoft.AspNetCore.Http;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UploadProfilePhoto
{
    public class UploadProfilePhotoRequest : IRequest<UploadProfilePhotoResponse>
    {
        public int AppUserId { get; set; }
        public IFormFile Image { get; set; }
    }
}
