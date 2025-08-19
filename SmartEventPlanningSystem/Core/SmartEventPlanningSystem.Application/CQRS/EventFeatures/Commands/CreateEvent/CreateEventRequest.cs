using MediatR;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using SmartEventPlanningSystem.Application.DTOs.EventDtos;

namespace SmartEventPlanningSystem.Application.CQRS.EventFeatures.Commands.CreateEvent
{
    public class CreateEventRequest : IRequest<bool>
    {
        public string EventDto { get; set; }
        public IFormFile EventImage { get; set; }
        public string EventCategories { get; set; }

        public CreateEventDto GetParsedDto() =>
                JsonConvert.DeserializeObject<CreateEventDto>(EventDto);



        public List<int> GetParsedCategories()
            => JsonConvert.DeserializeObject<List<int>>(EventCategories);
    }

}
