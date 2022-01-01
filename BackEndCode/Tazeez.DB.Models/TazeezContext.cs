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

        public virtual DbSet<QuestionnaireTemplateQuestion> QuestionnaireTemplateQuestion { get; set; }
        
        public virtual DbSet<QuestionnaireTemplate> QuestionnaireTemplate { get; set; }

        public virtual DbSet<QuestionnaireGroup> QuestionnaireGroup { get; set; }

        public virtual DbSet<Questionnaire> Questionnaire { get; set; }

        public virtual DbSet<QuestionnaireQuestion> QuestionnaireQuestion { get; set; }

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

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnType("TEXT")
                    .IsUnicode(true);
                
                entity.Property(e => e.CreatedDate)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
                
                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(255)
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
            
            modelBuilder.Entity<QuestionnaireTemplate>(entity =>
            {
                entity.HasIndex(e => e.Id, "Id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasMaxLength(500)
                      .IsUnicode(true);

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");                

                entity.Property(e => e.LastUpdatedUTC)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
            
            modelBuilder.Entity<QuestionnaireGroup>(entity =>
            {
                entity.HasIndex(e => e.Id, "Id_UNIQUE").IsUnique();

                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasMaxLength(500)
                      .IsUnicode(true);

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");                

                entity.Property(e => e.LastUpdatedUTC)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
            
            modelBuilder.Entity<Questionnaire>(entity =>
            {
                entity.HasIndex(e => e.QuestionnaireGroupId).HasDatabaseName("GroupId_QuestionnaireGroupId_idx");

                entity.HasIndex(e => e.QuestionnaireTemplateId).HasDatabaseName("TemplateId_QuestionnaireTemplateId_idx");

                entity.HasIndex(e => e.Id, "Id_UNIQUE").IsUnique();

                entity.Property(e => e.QuestionnaireGroupId).HasColumnType("int(11)");

                entity.Property(e => e.QuestionnaireTemplateId).HasColumnType("int(11)");

                entity.Property(e => e.Status).HasColumnType("int(11)");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.DueDateUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");                

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");                

                entity.Property(e => e.LastUpdatedUTC)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.QuestionnaireTemplate)
                    .WithMany(p => p.Questionnaires)
                    .HasForeignKey(d => d.QuestionnaireTemplateId)
                    .HasConstraintName("TemplateId_QuestionnaireTemplateId");

                entity.HasOne(d => d.QuestionnaireGroup)
                    .WithMany(p => p.Questionnaires)
                    .HasForeignKey(d => d.QuestionnaireGroupId)
                    .HasConstraintName("GroupId_QuestionnaireGroupId");
            });
            
            modelBuilder.Entity<QuestionnaireQuestion>(entity =>
            {
                entity.HasIndex(e => e.QuestionnaireId).HasDatabaseName("questionnaireId_questionQuestionnaireId_idx");

                entity.HasIndex(e => e.TemplateQuestionId).HasDatabaseName("questionnaireTemplateId_questionTemplateId_idx");

                entity.HasIndex(e => e.Id, "Id_UNIQUE").IsUnique();

                entity.Property(e => e.QuestionnaireId).HasColumnType("int(11)");

                entity.Property(e => e.TemplateQuestionId).HasColumnType("int(11)");

                entity.Property(e => e.Status).HasColumnType("int(11)");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");                

                entity.Property(e => e.LastUpdatedUTC)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.Questionnaire)
                    .WithMany(p => p.QuestionnaireQuestions)
                    .HasForeignKey(d => d.QuestionnaireId)
                    .HasConstraintName("questionnaireId_questionQuestionnaireId");

                entity.HasOne(d => d.QuestionnaireTemplateQuesion)
                    .WithMany(p => p.QuestionnaireQuestions)
                    .HasForeignKey(d => d.TemplateQuestionId)
                    .HasConstraintName("questionnaireTemplateId_questionTemplateId");
            });
            
            modelBuilder.Entity<QuestionnaireTemplateQuestion>(entity =>
            {
                entity.HasIndex(e => e.QuestionnaireTemplateId).HasDatabaseName("QuestionnaireTemplateQuestionTempId_TemplateQuestionTempId_idx");

                entity.HasIndex(e => e.Id, "Id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Question)
                    .IsRequired()
                    .HasColumnType("TEXT")
                    .IsUnicode(true);
                
                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.IsOptional).HasColumnType("tinyint(3)");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.QuestionnaireQuestionTypeId).HasColumnType("int(11)");

                entity.Property(e => e.QuestionnaireTemplateId).HasColumnType("int(11)");

                entity.Property(e => e.DisplayOrder).HasColumnType("int(11)");

                entity.Property(e => e.Score).HasColumnType("int(11)");

                entity.Property(e => e.LastUpdatedUTC)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.QuestionnaireTemplate)
                    .WithMany(p => p.QuestionnaireTemplateQuesions)
                    .HasForeignKey(d => d.QuestionnaireTemplateId)
                    .HasConstraintName("QuestionnaireTemplateQuestionTempId_TemplateQuestionTempId");
            });

            modelBuilder.Entity<User>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<ContactRequest>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireTemplateQuestion>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireTemplate>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireGroup>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireQuestion>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
