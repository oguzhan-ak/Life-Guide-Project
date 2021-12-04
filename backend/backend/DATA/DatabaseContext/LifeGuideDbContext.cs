using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LifeGuideProject.API.DATA.Entities.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LifeGuideProject.API.DATA.DatabaseContext
{
    public class LifeGuideDbContext : DbContext
    {
        public LifeGuideDbContext(DbContextOptions<LifeGuideDbContext> options) : base(options)
        {

        }
        public LifeGuideDbContext() : base()
        {

        }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                        .HasKey(c => c.UserId);

            // Entity classlarının içinde ya Employee employee şeklinde veya ICollection<Title> Titles şeklinde property tanımlayacaksın
            // sample for 1 to many
            
            //modelBuilder.Entity<Employee>()
            //            .HasMany(e => e.Titles)
            //            .WithOne(t => t.Employee);
            //modelBuilder.Entity<Employee>()
            //            .HasMany(e => e.Salaries)
            //            .WithOne(t => t.Employee);
            //modelBuilder.Entity<Employee>()
            //            .HasMany(e => e.DeptManagers)
            //            .WithOne(t => t.Employee);
            //modelBuilder.Entity<Department>()
            //           .HasMany(e => e.DeptManagers)
            //           .WithOne(t => t.Department);
        }
    }
}
