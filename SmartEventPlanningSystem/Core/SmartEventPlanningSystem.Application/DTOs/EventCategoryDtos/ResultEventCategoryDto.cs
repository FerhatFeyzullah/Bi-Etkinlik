using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartEventPlanningSystem.Application.DTOs.CategoryDtos;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.DTOs.EventCategoryDtos
{
    public class ResultEventCategoryDto
    {
        public ResultCategoryDto Category { get; set; }
    }
}
