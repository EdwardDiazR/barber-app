using BarberAppBackend.Features.Appointments.Entities;
using Microsoft.EntityFrameworkCore;

namespace BarberAppBackend.Data
{
    public class SqlServerDbContext : DbContext
    {
        public SqlServerDbContext() : base() { }

        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Appointment>();
             
        }
    }
}
