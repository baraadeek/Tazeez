﻿using Microsoft.EntityFrameworkCore;
using System;
using Tazeez.DataAccess.Models;
using Tazeez.DB.Models.DB;
using Tazeez.Infrastructure;

namespace Tazeez.Models.Models
{
    public partial class TazeezContext : DbContext
    {
        public bool IgnoreFilterOnEntity { get; set; }

        public bool IsIgnoreQuestionnaireTemplate { get; set; }

        private readonly IConfigurationSettings _configuration;

        public TazeezContext()
        {
        }

        public TazeezContext(DbContextOptions<TazeezContext> options, IConfigurationSettings configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Attachment> Attachment { get; set; }

        public virtual DbSet<QuestionAttachment> QuestionAttachment { get; set; }

        public virtual DbSet<Doctor> Doctor { get; set; }

        public virtual DbSet<User> User { get; set; }

        public virtual DbSet<ContactRequest> ContactRequest { get; set; }

        public virtual DbSet<QuestionnaireAnswerText> QuestionnaireAnswerText { get; set; }

        public virtual DbSet<QuestionnaireTemplateQuestion> QuestionnaireTemplateQuestion { get; set; }

        public virtual DbSet<QuestionnaireGroupTemplateQuestion> QuestionnaireGroupTemplateQuestion { get; set; }
        
        public virtual DbSet<QuestionnaireTemplate> QuestionnaireTemplate { get; set; }

        public virtual DbSet<QuestionnaireGroup> QuestionnaireGroup { get; set; }

        public virtual DbSet<Questionnaire> Questionnaire { get; set; }

        public virtual DbSet<QuestionnaireQuestion> QuestionnaireQuestion { get; set; }

        public virtual DbSet<QuestionnaireAnswerChoice> QuestionnaireAnswerChoice { get; set; }

        public virtual DbSet<QuestionChoice> QuestionChoice { get; set; }

        public virtual DbSet<TemplateGroupScore> TemplateGroupScore { get; set; }

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
            modelBuilder.Entity<Attachment>(entity =>
            {
                entity.HasIndex(e => e.Id)
                      .HasDatabaseName("Id_UNIQUE")
                      .IsUnique();

                entity.HasIndex(e => e.QuestionnaireId)
                    .HasDatabaseName("AttachmentId_QuestionnaireId_idx");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Archived)
                    .HasColumnType("tinyint(3)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.QuestionnaireId).HasColumnType("int(11)");

                entity.Property(e => e.CreatedUTC)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DisplayName)
                    .HasColumnType("varchar(500)")
                    .HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.Property(e => e.FileName)
                    .HasColumnType("varchar(500)")
                    .HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.FileKey)
                    .HasColumnType("varchar(500)")
                    .HasCharSet("latin1")
                    .UseCollation("latin1_swedish_ci");

                entity.Property(e => e.UploadType).HasColumnType("int(11)");

                entity.Property(e => e.Source).HasColumnType("int(11)");

                entity.Property(e => e.UserId).HasColumnType("int(11)");

                entity.Property(e => e.IsDraft).HasColumnType("tinyint(3)");

                entity.HasOne(d => d.Questionnaire)
                    .WithMany(p => p.Attachments)
                    .HasForeignKey(d => d.QuestionnaireId)
                    .HasConstraintName("AttachmentId_QuestionnaireId");
            });

            modelBuilder.Entity<Attachment>()
                        .HasDiscriminator<int>("Source")
                        .HasValue<Attachment>(0)
                        .HasValue<QuestionAttachment>(1);

            modelBuilder.Entity<QuestionAttachment>(entity =>
            {
                entity.Property(e => e.QuestionId).HasColumnName("SourceId");

                entity.HasOne(d => d.Question)
                .WithMany(p => p.QuestionAttachment)
                .HasForeignKey(d => d.QuestionId);

                entity.HasOne(d => d.User)
                .WithMany(p => p.QuestionAttachments)
                .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Doctor>(entity => {

                entity.HasIndex(e => e.Id)
                      .HasDatabaseName("Id_UNIQUE")
                      .IsUnique();

                entity.HasIndex(e => e.UserId).HasDatabaseName("Doctor_UserId_idx");

                entity.Property(e => e.Specialist)
                      .IsRequired()
                      .HasColumnType("varchar(500)");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Description)
                   .IsRequired()
                   .HasColumnType("TEXT");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Doctor)
                    .HasConstraintName("Doctor_UserId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.ParentId)
                    .HasDatabaseName("UserId_ParentId_idx");
                
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

                entity.Property(e => e.Email)
                      .IsRequired()
                      .HasColumnType("varchar(255)")
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
                      .UseCollation("latin1_swedish_ci")
                      .HasDefaultValueSql("('')");

                entity.Property(e => e.Image)
                      .IsRequired()
                      .HasColumnType("varchar(500)")
                      .HasCharSet("latin1")
                      .UseCollation("latin1_swedish_ci")
                      .HasDefaultValueSql("('')");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.IsAdmin).HasColumnType("tinyint(3)");

                entity.Property(e => e.Gender).HasColumnType("tinyint(3)");

                entity.Property(e => e.CreatedDateUTC)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.BirthDay)
                    .HasColumnType("timestamp");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.Children)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("UserId_ParentId");
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
                
                entity.Property(e => e.CreatedDateUTC)
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

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
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

                entity.HasIndex(e => e.UserId).HasDatabaseName("UserId_QuestionnaireUserId_idx");

                entity.HasIndex(e => e.Id, "Id_UNIQUE").IsUnique();

                entity.Property(e => e.QuestionnaireGroupId).HasColumnType("int(11)");

                entity.Property(e => e.QuestionnaireTemplateId).HasColumnType("int(11)");

                entity.Property(e => e.Status).HasColumnType("int(11)");
                
                entity.Property(e => e.UserId).HasColumnType("int(11)");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.DueDateUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");                

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.QuestionnaireTemplate)
                    .WithMany(p => p.Questionnaires)
                    .HasForeignKey(d => d.QuestionnaireTemplateId)
                    .HasConstraintName("TemplateId_QuestionnaireTemplateId");

                entity.HasOne(d => d.QuestionnaireGroup)
                    .WithMany(p => p.Questionnaires)
                    .HasForeignKey(d => d.QuestionnaireGroupId)
                    .HasConstraintName("GroupId_QuestionnaireGroupId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Questionnaires)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("UserId_QuestionnaireUserId");
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

                entity.HasOne(d => d.QuestionnaireTemplateQuestion)
                    .WithMany(p => p.QuestionnaireQuestions)
                    .HasForeignKey(d => d.TemplateQuestionId)
                    .HasConstraintName("questionnaireTemplateId_questionTemplateId");
            });
            
            modelBuilder.Entity<QuestionnaireAnswerText>(entity =>
            {
                entity.HasIndex(e => e.QuestionnaireQuestionId).HasDatabaseName("QuestionAnswerText_QuestionnaireQuestionId_idx");
                
                entity.HasIndex(e => e.UserId).HasDatabaseName("QuestionAnswerText_UserId_idx");
                
                entity.HasIndex(e => e.Id, "Id_UNIQUE").IsUnique();
                
                entity.Property(e => e.Id).HasColumnType("int(11)");
                
                entity.Property(e => e.QuestionnaireQuestionId).HasColumnType("int(11)");
                
                entity.Property(e => e.UserId).HasColumnType("int(11)");
                
                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnType("TEXT");

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
                
                entity.Property(e => e.LastUpdatedUTC)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
                
                entity.HasOne(d => d.QuestionnaireQuestion)
                    .WithMany(p => p.QuestionnaireAnswerText)
                    .HasForeignKey(d => d.QuestionnaireQuestionId)
                    .HasConstraintName("QuestionAnswerText_QuestionnaireQuestionId");
                
                entity.HasOne(d => d.User)
                    .WithMany(p => p.QuestionnaireAnswerText)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("QuestionAnswerText_UserId");
            });

            modelBuilder.Entity<QuestionnaireAnswerChoice>(entity =>
            {
                entity.HasIndex(e => e.QuestionnaireQuestionId).HasDatabaseName("QuestionnaireQuestionId_QuestionId_idx");

                entity.HasIndex(e => e.QuestionChoiceId).HasDatabaseName("QuestionChoiceId_QuestionChoiceId_idx");
                
                entity.HasIndex(e => e.UserId).HasDatabaseName("QuestionAnswer_UserId_idx");
                
                entity.HasIndex(e => e.Id, "Id_UNIQUE").IsUnique();
                
                entity.Property(e => e.Id).HasColumnType("int(11)");
                
                entity.Property(e => e.QuestionnaireQuestionId).HasColumnType("int(11)");

                entity.Property(e => e.QuestionChoiceId).HasColumnType("int(11)");
                
                entity.Property(e => e.UserId).HasColumnType("int(11)");
                
                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
                
                entity.Property(e => e.LastUpdatedUTC)
                    .HasPrecision(0)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
                
                entity.HasOne(d => d.QuestionnaireQuestion)
                    .WithMany(p => p.QuestionnaireAnswerChoice)
                    .HasForeignKey(d => d.QuestionnaireQuestionId)
                    .HasConstraintName("QuestionnaireQuestionId_QuestionId");
                
                entity.HasOne(d => d.QuestionChoice)
                    .WithMany(p => p.QuestionnaireAnswerChoice)
                    .HasForeignKey(d => d.QuestionChoiceId)
                    .HasConstraintName("QuestionAnswer_AssessmentQuestionAnswerChoiceId");
                
                entity.HasOne(d => d.User)
                    .WithMany(p => p.QuestionnaireAnswerChoice)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("QuestionAnswer_UserId");
            });
            
            modelBuilder.Entity<QuestionnaireTemplateQuestion>(entity =>
            {
                entity.HasIndex(e => e.QuestionnaireTemplateId).HasDatabaseName("GroupTemplateQuestion_TemplateQuestionId_idx");
                
                entity.HasIndex(e => e.QuestionnaireGroupTemplateQuestionId)
                      .HasDatabaseName("QuestionnaireTemplateQuestionTempId_TemplateQuestionTempId_idx");

                entity.HasIndex(e => e.Id, "Id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Question)
                    .IsRequired()
                    .HasColumnType("TEXT")
                    .IsUnicode(true);
                
                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.QuestionnaireQuestionTypeId).HasColumnType("int(11)");

                entity.Property(e => e.QuestionnaireTemplateId).HasColumnType("int(11)");

                entity.Property(e => e.QuestionnaireGroupTemplateQuestionId).HasColumnType("int(11)");

                entity.Property(e => e.DisplayOrder).HasColumnType("int(11)");

                entity.Property(e => e.Score).HasColumnType("int(11)");

                entity.Property(e => e.IsOptional).HasColumnType("tinyint(3)");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("timestamp")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.QuestionnaireTemplate)
                      .WithMany(p => p.QuestionnaireTemplateQuestions)
                      .HasForeignKey(d => d.QuestionnaireTemplateId)
                      .HasConstraintName("GroupTemplateQuestion_TemplateQuestionId");

                entity.HasOne(d => d.QuestionnaireGroupTemplateQuestion)
                      .WithMany(p => p.QuestionnaireTemplateQuestion)
                      .HasForeignKey(d => d.QuestionnaireGroupTemplateQuestionId)
                      .HasConstraintName("QuestionnaireTemplateQuestionTempId_TemplateQuestionTempId");

            });

            modelBuilder.Entity<QuestionnaireGroupTemplateQuestion>(entity =>
            {
                entity.HasIndex(e => e.Id, "Id_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.QuestionnaireTemplateId)
                      .HasDatabaseName("GroupTemplateQuestion_TemplateQuestionId_idx");

                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasColumnType("varchar(255)")
                      .IsUnicode(true);

                entity.Property(e => e.CreatedDateUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.QuestionnaireTemplate)
                      .WithMany(p => p.QuestionnaireGroupTemplateQuestions)
                      .HasForeignKey(d => d.QuestionnaireTemplateId)
                      .HasConstraintName("GroupTemplateQuestion_TemplateQuestionId");
            });

            modelBuilder.Entity<TemplateGroupScore>(entity =>
            {
                entity.HasIndex(e => e.Id, "Id_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.GroupTemplateId)
                      .HasDatabaseName("TemplateGroupId_TemplateGroupScore_idx");


                entity.Property(e => e.CreatedDateUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Score).HasColumnType("int(11)");

                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.QuestionnaireGroupTemplateQuestion)
                      .WithMany(p => p.TemplateGroupScore)
                      .HasForeignKey(d => d.GroupTemplateId)
                      .HasConstraintName("TemplateGroupId_TemplateGroupScore");
            });
            
            modelBuilder.Entity<QuestionChoice>(entity =>
            {
                entity.HasIndex(e => e.TemplateQuestionId).HasDatabaseName("TemplateQuestionId_ChoiceTemplateQuestionId_idx");

                entity.HasIndex(e => e.Id, "Id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Choice)
                    .IsRequired()
                    .HasColumnType("varchar(255)")
                    .IsUnicode(true);
                
                entity.Property(e => e.CreatedUTC)
                      .HasColumnType("timestamp")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");


                entity.Property(e => e.Archived).HasColumnType("tinyint(3)");

                entity.Property(e => e.TemplateQuestionId).HasColumnType("int(11)");

                entity.Property(e => e.DisplayOrder).HasColumnType("int(11)");

                entity.Property(e => e.Score).HasColumnType("int(11)");

                entity.Property(e => e.LastUpdatedUTC)
                      .HasColumnType("datetime")
                      .ValueGeneratedOnAddOrUpdate()
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.QuestionnaireTemplateQuestion)
                    .WithMany(p => p.QuestionChoices)
                    .HasForeignKey(d => d.TemplateQuestionId)
                    .HasConstraintName("TemplateQuestionId_ChoiceTemplateQuestionId");
            });

            modelBuilder.Entity<User>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<ContactRequest>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireTemplateQuestion>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireTemplate>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity || IsIgnoreQuestionnaireTemplate);
            modelBuilder.Entity<QuestionnaireGroup>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireQuestion>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireAnswerText>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireAnswerChoice>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<Doctor>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<Attachment>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<QuestionnaireGroupTemplateQuestion>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);
            modelBuilder.Entity<TemplateGroupScore>().HasQueryFilter(u => !u.Archived || IgnoreFilterOnEntity);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
