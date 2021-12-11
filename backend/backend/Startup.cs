using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.ENTITY;
using LifeGuideProject.API.ENTITY.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend
{
    public class Startup
    {
        private readonly string _loginOrigin = "_localorigin";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JWTConfig>(Configuration.GetSection("JWTConfig"));

            // Db configurations
            var sqlConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<LifeGuideDbContext>(opt =>
            {
                opt.UseNpgsql(sqlConnectionString);
            });
            services.AddIdentity<ApplicationUser, IdentityRole>(opt => { }).AddEntityFrameworkStores<LifeGuideDbContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                var key = Encoding.ASCII.GetBytes(Configuration["JWTConfig:Key"]);
                var issuer = Configuration["JWTConfig:Issuer"];
                var audience = Configuration["JWTConfig:Audience"];
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey=new SymmetricSecurityKey(key),
                    ValidateIssuer=true,
                    ValidateAudience=true,
                    RequireExpirationTime=true,
                    ValidIssuer= issuer,
                    ValidAudience= audience
                };
            });

            //Cors
            services.AddCors(opt =>
            {
                opt.AddPolicy(_loginOrigin, builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = ".NET Core 5 ", Version = "v1", Description = "This test description" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "dotnetClaimAuthorization v1"));
            }

            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MY API");
            //});

            app.UseHttpsRedirection();
            app.UseCors(_loginOrigin);
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


            
        }
    }
}
