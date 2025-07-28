using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.CreateEvent
{
    public class CreateEventHandler(IEventService eventService,IUnitOfWork unitOfWork,IFileStorageService fileStorageService) : IRequestHandler<CreateEventRequest, bool>
    {
        public async Task<bool> Handle(CreateEventRequest request, CancellationToken cancellationToken)
        {
            
            await unitOfWork.BeginTransactionAsync();
            try
            {
                string path = "events";
                var filePath = await fileStorageService.UploadImage(request.EventImage, path);
                await eventService.CreateEvent(request.EventDto, request.EventCategories,filePath, cancellationToken);
                await unitOfWork.CommitAsync();
                return true;
            }

            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                Console.WriteLine($"hata var reis: {ex.Message}");
                return false;

            }

        }
    }
}
