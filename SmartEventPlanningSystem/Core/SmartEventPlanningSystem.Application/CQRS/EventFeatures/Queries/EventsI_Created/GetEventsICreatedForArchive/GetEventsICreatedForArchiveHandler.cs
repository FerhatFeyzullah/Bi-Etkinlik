using MediatR;
using SmartEventPlanningSystem.Application.Services;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Queries.EventsI_Created.GetEventsICreatedForArchive
{
    public class GetEventsICreatedForArchiveHandler(IEventService eventService) : IRequestHandler<GetEventsICreatedForArchiveRequest, GetEventsICreatedForArchiveResponse>
    {
        public async Task<GetEventsICreatedForArchiveResponse> Handle(GetEventsICreatedForArchiveRequest request, CancellationToken cancellationToken)
        {
            return await eventService.GetEventsI_CreatedForArchive(request.AppUserId, cancellationToken);
        }
    }
}
