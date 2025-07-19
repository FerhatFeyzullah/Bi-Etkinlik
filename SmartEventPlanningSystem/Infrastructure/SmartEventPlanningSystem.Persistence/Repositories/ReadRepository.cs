using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Application.Repositories;
using SmartEventPlanningSystem.Persistence.DbContext;

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
            return await Table.ToListAsync(ct);
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
