using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
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
        public async Task AddAsync(T entity)
        {
            await Table.AddAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await Table.FindAsync(id);
            Table.Remove(entity);
        }

        public async Task Update(T entity)
        {
            Table.Update(entity);
            await Task.CompletedTask;
        }

        public async Task DeleteRangeAsync(List<T> entities)
        {
            Table.RemoveRange(entities);
            await Task.CompletedTask;
        }
    }
}
