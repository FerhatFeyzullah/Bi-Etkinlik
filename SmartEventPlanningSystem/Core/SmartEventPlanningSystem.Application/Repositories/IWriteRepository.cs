namespace SmartEventPlanningSystem.Application.Repositories
{
    public interface IWriteRepository<T> where T : class
    {
        Task AddAsync(T entity, CancellationToken ct = default);
        Task Update(T entity, CancellationToken ct = default);
        Task DeleteAsync(int id, CancellationToken ct = default);
        void DeleteEntity(T entity);
        Task DeleteRangeAsync(List<T> entities, CancellationToken ct = default);
    }

}
