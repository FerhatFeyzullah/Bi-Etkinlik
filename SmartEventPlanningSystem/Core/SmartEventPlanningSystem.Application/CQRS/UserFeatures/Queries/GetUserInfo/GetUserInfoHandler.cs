using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetUserInfo
{
    public class GetUserInfoHandler(IUnitOfWork unitOfWork,IMapper mapper) : IRequestHandler<GetUserInfoRequest, GetUserInfoResponse>
    {
        public async Task<GetUserInfoResponse> Handle(GetUserInfoRequest request, CancellationToken cancellationToken)
        {
            var repsonse = await unitOfWork.ReadRepository<AppUser>().GetByIdAsync(request.AppUserId); 
            return mapper.Map<GetUserInfoResponse>(repsonse);
        }
    }
}
