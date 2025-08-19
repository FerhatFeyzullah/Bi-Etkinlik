using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.Repositories;
using SmartEventPlanningSystem.Persistence.DbContext;
using System.Linq.Expressions;

namespace SmartEventPlanningSystem.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : class
    {
        private readonly SEP_DbContext _context;
        public DbSet<T> Table => _context.Set<T>();

        public ReadRepository(SEP_DbContext context)
        {
            _context = context;
        }

        public async Task<int> CountAsync(CancellationToken ct = default)
        {
            return await Table.CountAsync(ct);
        }

        public async Task<int> FilteredCountAsync(Expression<Func<T, bool>> filter, CancellationToken ct = default)
        {
            return await Table.Where(filter).CountAsync(ct);
        }

        public async Task<List<T>> GetAllAsync(CancellationToken ct = default)
        {
            return await Table.ToListAsync();
        }

        public async Task<List<T>> GetAllAsync(Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, CancellationToken ct = default)
        {
            IQueryable<T> query = Table;

            if (orderBy != null)
                query = orderBy(query);

            return await query.ToListAsync(ct);
        }

        public async Task<T> GetByIdAsync(int id, CancellationToken ct = default)
        {
            return await Table.FindAsync(new object[] { id }, ct);
        }

        public async Task<T> GetByFiltered(Expression<Func<T, bool>> filter, CancellationToken ct = default)
        {
            return await Table.Where(filter).FirstOrDefaultAsync(ct);
        }

        public async Task<T> GetByFiltered(Expression<Func<T, bool>> filter, CancellationToken ct = default, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = Table.Where(filter);
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return await query.FirstOrDefaultAsync(ct);
        }

        public async Task<T> GetByFiltered(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IQueryable<T>> include = null, CancellationToken ct = default)
        {
            IQueryable<T> query = Table.Where(filter);
            if (include != null)
            {
                query = include(query);
            }
            return await query.FirstOrDefaultAsync(ct);
        }

        public async Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter, CancellationToken ct = default)
        {
            return await Table.Where(filter).ToListAsync(ct);
        }

        public async Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter, CancellationToken ct = default, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = Table.Where(filter);
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return await query.ToListAsync(ct);
        }

        public async Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IQueryable<T>> include = null, CancellationToken ct = default)
        {
            IQueryable<T> query = Table.Where(filter);
            if (include != null)
            {
                query = include(query);
            }
            return await query.ToListAsync(ct);
        }


    }

}
