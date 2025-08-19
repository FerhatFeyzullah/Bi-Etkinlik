using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Infrastructure.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment _environment;

        public FileStorageService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task DeleteImage(string imagePath)
        {

            if (string.IsNullOrEmpty(imagePath))
            {
                // Dosya yolu boşsa işlem yapma, direkt çık
                return;
            }
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imagePath);

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }

            await Task.CompletedTask;
        }

        public async Task<string> UploadImage(IFormFile image, string folderName)
        {

            var uploadFolder = Path.Combine(_environment.WebRootPath, "upload", folderName);

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await image.CopyToAsync(stream);

            var relativePath = Path.Combine("upload", folderName, fileName).Replace("\\", "/");
            return relativePath;

            //return fileName;
        }
    }
}
