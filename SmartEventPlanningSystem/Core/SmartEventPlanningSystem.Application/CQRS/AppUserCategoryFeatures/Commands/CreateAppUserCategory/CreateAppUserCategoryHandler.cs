using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Domain.Entities;

namespace SmartEventPlanningSystem.Application.CQRS.AppUserCategoryFeatures.Commands.CreateAppUserCategory
{
    public class CreateAppUserCategoryHandler(IUnitOfWork unitOfWork) : INotificationHandler<CreateAppUserCategoryNotification>
    {
        public async Task Handle(CreateAppUserCategoryNotification notification, CancellationToken cancellationToken)
        {

            foreach (var interest in notification.AreasOfInterest) 
            {
                var appUserCategory = new AppUserCategory
                {
                    AppUserId = notification.AppUserId,
                    CategoryId = interest
                };
                await unitOfWork.WriteRepository<AppUserCategory>().AddAsync(appUserCategory);
                await unitOfWork.CommitAsync();
            }
        }
    }
}
