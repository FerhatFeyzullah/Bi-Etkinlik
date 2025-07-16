using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.CategoryDtos;
using SmartEventPlanningSystem.Application.DTOs.UserDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.UserFeatures.Queries.GetMyProfile
{
    public class GetMyProfileResponse
    {
        public ResultUserDto User { get; set; }
        public List<ResultCategoryDto> HisCategory { get; set; }

    }
}
