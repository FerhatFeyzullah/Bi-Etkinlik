using SmartEventPlanningSystem.Application.Repositories;

namespace SmartEventPlanningSystem.Application.UnitOfWorks
{
    public interface IUnitOfWork
    {
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();

        IReadRepository<T> ReadRepository<T>() where T : class;
        IWriteRepository<T> WriteRepository<T>() where T : class;

    }
}
