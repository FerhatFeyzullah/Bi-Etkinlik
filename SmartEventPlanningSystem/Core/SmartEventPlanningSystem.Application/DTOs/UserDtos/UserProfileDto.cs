using SmartEventPlanningSystem.Application.DTOs.AppUserCatgeoryDtos;

namespace SmartEventPlanningSystem.Application.DTOs.UserDtos
{
    public class UserProfileDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public DateOnly BirthDate { get; set; }
        public string Gender { get; set; }
        public string? ProfilePhotoId { get; set; }
        public decimal Score { get; set; }
        public bool EmailConfirmed { get; set; }

        public List<ResultAppUserCategoryDto> AppUserCategories { get; set; }
    }
}
