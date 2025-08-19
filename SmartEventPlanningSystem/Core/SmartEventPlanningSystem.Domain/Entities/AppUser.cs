using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace SmartEventPlanningSystem.Domain.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public DateOnly BirthDate { get; set; }
        public string Gender { get; set; }
        public string? ProfilePhotoId { get; set; }
        public decimal Score { get; set; }
        public int NumberOfRaters { get; set; }

        public List<Event> MyEvents { get; set; }
        public List<AppUserCategory> AppUserCategories { get; set; }


        public string SettingsJson { get; set; }

        [NotMapped]
        public UserSetting Settings
        {
            get => string.IsNullOrWhiteSpace(SettingsJson)
                ? new UserSetting()
                : JsonSerializer.Deserialize<UserSetting>(SettingsJson);

            set => SettingsJson = JsonSerializer.Serialize(value);
        }
    }
}
