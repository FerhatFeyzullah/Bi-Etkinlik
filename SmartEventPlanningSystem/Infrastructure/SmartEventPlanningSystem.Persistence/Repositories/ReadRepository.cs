using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<int> CountAsync()
        {
            return await Table.CountAsync();
        }

        public async Task<int> FilteredCountAsync(System.Linq.Expressions.Expression<Func<T, bool>> kosul)
        {
            return await Table.Where(kosul).CountAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await Table.ToListAsync();
        }

        public async Task<T> GetByFiltered(System.Linq.Expressions.Expression<Func<T, bool>> kosul)
        {
            return await Table.Where(kosul).FirstOrDefaultAsync();
        }

        public Task<T> GetByFiltered(System.Linq.Expressions.Expression<Func<T, bool>> kosul, params System.Linq.Expressions.Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = Table.Where(kosul);
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetByFilteredList(System.Linq.Expressions.Expression<Func<T, bool>> kosul)
        {
            return await Table.Where(kosul).ToListAsync();
        }

        public Task<List<T>> GetByFilteredList(System.Linq.Expressions.Expression<Func<T, bool>> kosul, params System.Linq.Expressions.Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = Table.Where(kosul);
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return query.ToListAsync();
        }

        public async  Task<T> GetByIdAsync(int id)
        {
            return await Table.FindAsync(id);
        }
    }
}
