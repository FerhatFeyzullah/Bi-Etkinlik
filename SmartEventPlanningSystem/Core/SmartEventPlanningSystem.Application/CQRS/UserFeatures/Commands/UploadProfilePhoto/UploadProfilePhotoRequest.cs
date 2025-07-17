using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Commands.UploadProfilePhoto
{
    public class UploadProfilePhotoRequest:IRequest<UploadProfilePhotoResponse>
    {
        public int AppUserId { get; set; }
        public IFormFile Image { get; set; }
    }
}
