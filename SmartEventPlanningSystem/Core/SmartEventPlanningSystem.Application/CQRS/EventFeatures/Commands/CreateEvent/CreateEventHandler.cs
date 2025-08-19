using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.CreateEvent
{
    public class CreateEventHandler(IEventService eventService, IUnitOfWork unitOfWork, IFileStorageService fileStorageService) : IRequestHandler<CreateEventRequest, bool>
    {
        public async Task<bool> Handle(CreateEventRequest request, CancellationToken cancellationToken)
        {

            await unitOfWork.BeginTransactionAsync();
            string filePath = null;
            try
            {
                string path = "events";
                filePath = await fileStorageService.UploadImage(request.EventImage, path);

                await eventService.CreateEvent(request.GetParsedDto(), request.GetParsedCategories(), filePath, cancellationToken);

                await unitOfWork.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();

                // hata olduysa yüklenen resmi sil
                if (!string.IsNullOrWhiteSpace(filePath))
                {
                    await fileStorageService.DeleteImage(filePath);
                }

                Console.WriteLine($"hata var reis: {ex.Message}");
                return false;
            }

        }
    }
}
