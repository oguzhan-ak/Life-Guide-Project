using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LifeGuideProject.API.ENTITY.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LifeGuideProject.API.DATA.DatabaseContext
{
    public class LifeGuideDbContext : IdentityDbContext<ApplicationUser,IdentityRole,string>
    {
        public LifeGuideDbContext(DbContextOptions options) : base(options)
        {

        }
        public LifeGuideDbContext()
        {

        }
        public DbSet<FirstForm> firstForms { get; set; }

        
    }
}
