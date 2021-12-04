﻿// <auto-generated />
using System;
using LifeGuideProject.API.DATA.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LifeGuideProject.API.Migrations
{
    [DbContext(typeof(LifeGuideDbContext))]
    partial class LifeGuideDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("LifeGuideProject.API.DATA.Entities.User.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("UserId")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("CreatedTime");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean")
                        .HasColumnName("IsActive");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("UpdatedTime");

                    b.Property<long?>("UserAge")
                        .HasColumnType("bigint")
                        .HasColumnName("UserAge");

                    b.Property<DateTime?>("UserBirthDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("UserBirthDate");

                    b.Property<string>("UserEmail")
                        .HasColumnType("text")
                        .HasColumnName("UserEmail");

                    b.Property<double?>("UserHeight")
                        .HasColumnType("double precision")
                        .HasColumnName("UserHeight");

                    b.Property<string>("UserName")
                        .HasColumnType("text")
                        .HasColumnName("UserName");

                    b.Property<string>("UserPassword")
                        .HasColumnType("text")
                        .HasColumnName("UserPassword");

                    b.Property<double?>("UserWeight")
                        .HasColumnType("double precision")
                        .HasColumnName("UserWeight");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });
#pragma warning restore 612, 618
        }
    }
}
