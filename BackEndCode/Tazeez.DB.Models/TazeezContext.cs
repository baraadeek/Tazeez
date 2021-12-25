using Microsoft.EntityFrameworkCore;
using System;
using Tazeez.DB.Models.DB;
using Tazeez.Infrastructure;

namespace Tazeez.Models.Models
{
    public partial class TazeezContext : DbContext
    {
        public bool IgnoreFilterOnEntity { get; set; }

        private readonly IConfigurationSettings _configuration;

        public TazeezContext()
        {
        }

        public TazeezContext(DbContextOptions<TazeezContext> options, IConfigurationSettings configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<ContactRequest> ContactRequest { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.DatabaseConnectionString;
                optionsBuilder.UseMySql(connectionString,
                                        new MySqlServerVersion(new Version(8, 0, 25)),
                                        option => option.EnableRetryOnFailure(2, TimeSpan.FromSeconds(2), null)
                                                        .EnableStringComparisonTranslations(true));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .HasDatabaseName("Id_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "Email_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.FirstName)
                      .IsRequired()
                      .HasColumnType("varchar(255)")
                      .HasCharSet("latin1")
                      .UseCollation("latin1_swedish_ci");


                entity.Property(e => e.LastName)
                      .IsRequired()
                      .HasColumnType("varchar(255)")
                      .HasCharSet("latin1")
                      .UseCollation("latin1_swedish_ci");

                entity.Property(e => e.PhoneNumber)
                      .IsRequired()
                      .HasColumnType("varchar(45)")
                      .HasCharSet("latin1")
                      .UseCollation("latin1_swedish_ci")
                      .HasDefaultValueSql("('')");

                entity.Property(e => e.City)
                      .IsRequired()
                      .HasColumnType("varchar(45)")
                      .HasCharSet("latin1")
                      .UseCollation("latin1_swedish_ci")
                      .HasDefaultValueSql("('')");

                entity.Property(e => e.Password)
                      .IsRequired()
                      .HasColumnType("varchar(500)")
                      .HasCharSet("latin1")
                      .UseCollation("latin1_swedish_ci");

                entity.Property(e => e.Image)
                      .IsRequired()
                      .HasColumnType("varchar(500)")
                      .HasCharSet("latin1")
                      .UseCollation("latin1_swedish_ci")
                      .HasDefaultValueSql("('')");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.IsAdmin).HasColumnType("tinyint(3)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .ValueGeneratedOnAddOrUpdate();
            });
            
            modelBuilder.Entity<ContactRequest>(entity =>
            {
                entity.HasIndex(e => e.Id, "Id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Archived).HasColumnType("smallint");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnType("TEXT")
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");
                
                entity.Property(e => e.CreatedDate)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
                
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(225)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.UpdateDate)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<User>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<ContactRequest>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
