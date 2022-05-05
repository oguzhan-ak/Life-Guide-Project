using LifeGuideProject.API.ENTITY.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LifeGuideProject.API.DATA.DatabaseContext
{
    public class LifeGuideDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public LifeGuideDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<FirstForm> firstForms { get; set; }
        public DbSet<Exercise> exercises { get; set; }
        public DbSet<UserExercise> userExercises { get; set; }
        public DbSet<Connection> connections { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseNpgsql("Host=localhost;port=5432;Database=LifeGuideDatabase;UserName=postgres;Password=postgres;");

    }
}
