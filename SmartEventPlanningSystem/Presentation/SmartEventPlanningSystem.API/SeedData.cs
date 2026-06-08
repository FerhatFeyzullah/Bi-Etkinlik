using Microsoft.AspNetCore.Identity;
using SmartEventPlanningSystem.Domain.Entities;
using SmartEventPlanningSystem.Persistence.DbContext;

namespace SmartEventPlanningSystem.API
{
    /// <summary>
    /// Idempotent başlangıç seed'i. Her startup'ta Migrate() sonrasında çalışır;
    /// var olan kaydı tekrar eklemez, hata durumunda uygulamayı durdurmaz (loglar).
    /// </summary>
    public static class SeedData
    {
        // "User" rolü olmadan kayıt akışı tamamen kırık (UserService.AddToRoleAsync) —
        // bu yüzden roller her şeyden önce eklenir.
        private static readonly string[] Roles = { "User", "Admin" };

        // DİKKAT: Bu adlar frontend'in görsel slug'ı (toLowerCase + boşluk→tire + .gif)
        // ve i18n çeviri anahtarlarıyla birebir eşleşir — yazımı DEĞİŞTİRMEYİN.
        // (37/37 eşleşme assets/categoryImages/gif altındaki dosyalarla doğrulandı.)
        private static readonly string[] Categories =
        {
            "Tiyatro", "Kamp", "Tenis", "Paintball", "Satranç", "Futbol", "Basketbol",
            "Voleybol", "Masa Tenisi", "Yüzme", "Yoga", "Trekking", "Bisiklet", "Koşu",
            "Balık Tutma", "Sinema", "Konser", "Kitap", "Gönüllülük", "Bowling",
            "Astronomi", "Karaoke", "Girişimcilik", "Langırt", "Foto Safari", "Stand-Up",
            "Çizim", "Kodlama", "E-Spor", "Graffiti", "Kaykay", "Paten", "Buz Pateni",
            "Piknik", "Mangal", "Yürüyüş", "Okçuluk"
        };

        public static async Task ApplyAsync(IServiceProvider services)
        {
            var logger = services.GetRequiredService<ILoggerFactory>().CreateLogger("SeedData");

            try
            {
                // 1) Roller
                var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                foreach (var roleName in Roles)
                {
                    if (!await roleManager.RoleExistsAsync(roleName))
                    {
                        // NormalizedName'i RoleManager kendisi set eder
                        var result = await roleManager.CreateAsync(new AppRole { Name = roleName });
                        if (result.Succeeded)
                            logger.LogInformation("Seed: '{Role}' rolü oluşturuldu.", roleName);
                        else
                            logger.LogWarning("Seed: '{Role}' rolü oluşturulamadı: {Errors}",
                                roleName, string.Join(", ", result.Errors.Select(e => e.Description)));
                    }
                }

                // 2) Kategoriler
                var context = services.GetRequiredService<SEP_DbContext>();
                var existingNames = context.Categories.Select(c => c.CategoryName).ToHashSet();
                var missing = Categories.Where(name => !existingNames.Contains(name)).ToList();
                if (missing.Count > 0)
                {
                    context.Categories.AddRange(missing.Select(name => new Category { CategoryName = name }));
                    await context.SaveChangesAsync();
                    logger.LogInformation("Seed: {Count} kategori eklendi.", missing.Count);
                }

                // 3) Admin kullanıcısı — yalnızca Seed__AdminEmail ve Seed__AdminPassword doluysa
                var configuration = services.GetRequiredService<IConfiguration>();
                var adminEmail = configuration["Seed:AdminEmail"];
                var adminPassword = configuration["Seed:AdminPassword"];

                if (string.IsNullOrWhiteSpace(adminEmail) || string.IsNullOrWhiteSpace(adminPassword))
                {
                    logger.LogInformation("Seed: Seed__AdminEmail/Seed__AdminPassword boş — admin oluşturma atlandı.");
                    return;
                }

                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                var admin = await userManager.FindByEmailAsync(adminEmail);
                if (admin is null)
                {
                    admin = new AppUser
                    {
                        UserName = adminEmail,
                        Email = adminEmail,
                        EmailConfirmed = true,
                        FirstName = "Sistem",
                        LastName = "Yöneticisi",
                        City = "İstanbul",
                        BirthDate = new DateOnly(1990, 1, 1),
                        Gender = "Belirtilmedi",
                        Score = 0,
                        NumberOfRaters = 0,
                        Settings = new UserSetting
                        {
                            Theme = "light",
                            ViewMode = "classic",
                            EmailNotification = false,
                            Language = "tr",
                        },
                    };

                    var createResult = await userManager.CreateAsync(admin, adminPassword);
                    if (!createResult.Succeeded)
                    {
                        logger.LogWarning("Seed: admin kullanıcısı oluşturulamadı: {Errors}",
                            string.Join(", ", createResult.Errors.Select(e => e.Description)));
                        return;
                    }
                    logger.LogInformation("Seed: admin kullanıcısı oluşturuldu ({Email}).", adminEmail);
                }

                if (!await userManager.IsInRoleAsync(admin, "Admin"))
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                    logger.LogInformation("Seed: '{Email}' kullanıcısına Admin rolü atandı.", adminEmail);
                }
            }
            catch (Exception ex)
            {
                // Seed hatası uygulamayı durdurmamalı
                logger.LogError(ex, "Seed sırasında beklenmeyen hata — uygulama açılmaya devam ediyor.");
            }
        }
    }
}
