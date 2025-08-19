using Microsoft.AspNetCore.Http;

namespace SmartEventPlanningSystem.Infrastructure.Interfaces
{
    public interface IFileStorageService
    {
        Task<string> UploadImage(IFormFile image, string folderName);
        Task DeleteImage(string imagePath);

    }
}
