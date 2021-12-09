using LifeGuideProject.API.DATA.DatabaseContext;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Cors

            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                 {
                     builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                 });
            });


            // Db configurations
            var sqlConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<LifeGuideDbContext>(opt =>
            {
                opt.UseNpgsql(sqlConnectionString);
            });

            services.AddAuthentication(opt =>
               {
                   opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                   opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
               }
            ).AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidateAudience=true,
                   ValidateLifetime=true,
                   ValidateIssuerSigningKey=true,

                   ValidIssuer= "https://localhost:5001",
                   ValidAudience = "https://localhost:5001",
                   IssuerSigningKey= new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
               };
           });


            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "backend", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            //cors
            app.UseCors("EnableCORS");

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
