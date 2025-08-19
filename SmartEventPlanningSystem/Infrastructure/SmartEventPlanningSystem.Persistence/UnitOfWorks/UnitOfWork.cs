using Microsoft.EntityFrameworkCore.Storage;
using SmartEventPlanningSystem.Application.Repositories;
using SmartEventPlanningSystem.Application.UnitOfWorks;
using SmartEventPlanningSystem.Persistence.DbContext;
using SmartEventPlanningSystem.Persistence.Repositories;

namespace SmartEventPlanningSystem.Persistence.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly SEP_DbContext _context;
        private IDbContextTransaction _transaction;

        public UnitOfWork(SEP_DbContext context)
        {
            _context = context;
        }


        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
            if (_transaction != null)
                await _transaction.CommitAsync();
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
                await _transaction.RollbackAsync();
        }

        public IReadRepository<T> ReadRepository<T>() where T : class => new ReadRepository<T>(_context);
        public IWriteRepository<T> WriteRepository<T>() where T : class => new WriteRepository<T>(_context);

    }
}
