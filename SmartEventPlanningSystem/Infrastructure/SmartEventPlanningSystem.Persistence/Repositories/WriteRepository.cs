using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.Repositories;
using SmartEventPlanningSystem.Persistence.DbContext;

namespace SmartEventPlanningSystem.Persistence.Repositories
{
    public class WriteRepository<T> : IWriteRepository<T> where T : class
    {
        private readonly SEP_DbContext _context;
        public DbSet<T> Table => _context.Set<T>();

        public WriteRepository(SEP_DbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(T entity, CancellationToken ct = default)
        {
            await Table.AddAsync(entity, ct);
        }

        public async Task DeleteAsync(int id, CancellationToken ct = default)
        {
            var entity = await Table.FindAsync(new object[] { id }, ct);
            if (entity != null)
                Table.Remove(entity);
        }

        public Task Update(T entity, CancellationToken ct = default)
        {
            Table.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteRangeAsync(List<T> entities, CancellationToken ct = default)
        {
            Table.RemoveRange(entities);
            return Task.CompletedTask;
        }

        public void DeleteEntity(T entity)
        {
            Table.Remove(entity);
        }

    }

}
