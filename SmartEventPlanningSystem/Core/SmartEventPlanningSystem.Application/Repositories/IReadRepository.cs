using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.Repositories
{
    public interface IReadRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();
        Task<T> GetByFiltered(Expression<Func<T,bool>> filter);
        Task<T> GetByFiltered(Expression<Func<T,bool>> filter, params Expression<Func<T, object>>[] includes);
        Task<T> GetByFiltered(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IQueryable<T>> include = null);
        Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter);
        Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] includes);
        Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter,Func<IQueryable<T>, IQueryable<T>> include = null);
        Task<int> FilteredCountAsync(Expression<Func<T, bool>> filter);
        Task<int> CountAsync();

    }
}
