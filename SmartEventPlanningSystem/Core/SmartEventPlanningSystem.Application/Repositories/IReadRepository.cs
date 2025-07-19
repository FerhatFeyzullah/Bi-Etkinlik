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
        Task<T> GetByIdAsync(int id, CancellationToken ct = default);
        Task<List<T>> GetAllAsync(CancellationToken ct = default);

        Task<T> GetByFiltered(Expression<Func<T, bool>> filter, CancellationToken ct = default);
        Task<T> GetByFiltered(Expression<Func<T, bool>> filter, CancellationToken ct = default, params Expression<Func<T, object>>[] includes);
        Task<T> GetByFiltered(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IQueryable<T>> include = null, CancellationToken ct = default);

        Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter, CancellationToken ct = default);
        Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter, CancellationToken ct = default, params Expression<Func<T, object>>[] includes);
        Task<List<T>> GetByFilteredList(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IQueryable<T>> include = null, CancellationToken ct = default);

        Task<int> FilteredCountAsync(Expression<Func<T, bool>> filter, CancellationToken ct = default);
        Task<int> CountAsync(CancellationToken ct = default);
    }

}
