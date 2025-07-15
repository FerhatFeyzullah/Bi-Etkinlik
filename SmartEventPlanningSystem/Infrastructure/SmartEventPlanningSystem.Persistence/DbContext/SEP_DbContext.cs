using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SmartEventPlanningSystem.Domain.Entities;


namespace SmartEventPlanningSystem.Persistence.DbContext
{
    public class SEP_DbContext:IdentityDbContext<AppUser,AppRole,int>
    {
        public SEP_DbContext(DbContextOptions<SEP_DbContext> options) :base(options)
        {
        }

        public DbSet<AppUserCategory> AppUserCategories { get; set; }
        public DbSet<EventCategory> EventCategories { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventRegister> EventRegisters { get; set; }
        public DbSet<Message> Messages { get; set; }

    }


}
