﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TaxCalculator.Data;

#nullable disable

namespace TaxCalculator.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250516011200_Update")]
    partial class Update
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TaxCalculator.Models.TaxBand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("LowerLimit")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<int>("PercentageRate")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("TaxBands");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            LowerLimit = 0,
                            Name = "A",
                            PercentageRate = 0
                        },
                        new
                        {
                            Id = 2,
                            LowerLimit = 5000,
                            Name = "B",
                            PercentageRate = 20
                        },
                        new
                        {
                            Id = 3,
                            LowerLimit = 20000,
                            Name = "C",
                            PercentageRate = 40
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
