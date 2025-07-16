using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartEventPlanningSystem.Application.Repositories
{
    public interface IWriteRepository<T> where T : class
    {
        Task AddAsync(T entity);
        Task Update(T entity);
        Task DeleteAsync(int id);
        Task DeleteRangeAsync(List<T> entities);

    }
}
