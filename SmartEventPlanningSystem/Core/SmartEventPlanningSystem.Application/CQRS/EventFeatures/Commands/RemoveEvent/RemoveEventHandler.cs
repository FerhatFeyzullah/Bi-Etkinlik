using MediatR;
using SmartEventPlanningSystem.Application.Services;
using SmartEventPlanningSystem.Infrastructure.Interfaces;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.RemoveEvent
{
    public class RemoveEventHandler(IEventService eventService, IFileStorageService fileStorageService) : IRequestHandler<RemoveEventRequest, Unit>
    {
        public async Task<Unit> Handle(RemoveEventRequest request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var path = await eventService.RemoveEvent(request.EventId, cancellationToken);

            await fileStorageService.DeleteImage(path);

            return Unit.Value;
        }
    }
}
