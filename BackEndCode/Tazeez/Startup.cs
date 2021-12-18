using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using JustProtectPublicApi.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using Tazeez.Extensions;
using Tazeez.Factory;
using Tazeez.Models.Models;
using Unchase.Swashbuckle.AspNetCore.Extensions.Extensions;

namespace Tazeez
{
    public class Startup
    {
        #region Properties

        private MapperConfiguration AutoMapperConfiguration { get; set; }

        public IConfiguration Configuration { get; }

        #endregion Properties

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            AutoMapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new Core.Mapper.Mapping());
            });

            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TazeezContext>(ServiceLifetime.Transient);
            services.AddSingleton(sp => AutoMapperConfiguration.CreateMapper());

            services.AddControllers()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddCors(o => o.AddPolicy("TazeezPolicy", policy =>
            {
                policy.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddApiVersioning(options =>
            {
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.ReportApiVersions = true;
            });

            services.AddVersionedApiExplorer(options =>
            {
                // add the versioned api explorer, which also adds IApiVersionDescriptionProvider service  
                // note: the specified format code will format the version as "'v'major[.minor][-status]"  
                options.GroupNameFormat = "'v'VVV";

                // note: this option is only necessary when versioning by url segment. the SubstitutionFormat  
                // can also be used to control the format of the API version in route templates  
                options.SubstituteApiVersionInUrl = true;
            });

            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

            services.AddSwaggerGen(options =>
            {
                options.OperationFilter<SwaggerDefaultValues>();
                //var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                //var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                //options.IncludeXmlComments(xmlPath);

                options.AddSecurityDefinition("Bearer",
                        new OpenApiSecurityScheme()
                        {
                            Description = "Please insert Bearer JWT token into field. Example: 'Bearer {token}'",
                            Name = "Authorization",
                            In = ParameterLocation.Header,
                            Type = SecuritySchemeType.ApiKey
                        });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });

                options.UseAllOfToExtendReferenceSchemas();

                options.IncludeXmlCommentsFromInheritDocs(includeRemarks: true, excludedTypes: typeof(string));

                options.AddEnumsWithValuesFixFilters(services, o =>
                {
                    // add schema filter to fix enums (add 'x-enumNames' for NSwag or its alias from XEnumNamesAlias) in schema
                    o.ApplySchemaFilter = true;

                    // alias for replacing 'x-enumNames' in swagger document
                    o.XEnumNamesAlias = "x-enum-varnames";

                    // alias for replacing 'x-enumDescriptions' in swagger document
                    o.XEnumDescriptionsAlias = "x-enum-descriptions";

                    // add parameter filter to fix enums (add 'x-enumNames' for NSwag or its alias from XEnumNamesAlias) in schema parameters
                    o.ApplyParameterFilter = true;

                    // add document filter to fix enums displaying in swagger document
                    o.ApplyDocumentFilter = true;

                    // add descriptions from DescriptionAttribute or xml-comments to fix enums (add 'x-enumDescriptions' or its alias from XEnumDescriptionsAlias for schema extensions) for applied filters
                    o.IncludeDescriptions = true;

                    // add remarks for descriptions from xml-comments
                    o.IncludeXEnumRemarks = true;

                    // get descriptions from DescriptionAttribute then from xml-comments
                    o.DescriptionSource = DescriptionSources.DescriptionAttributesThenXmlComments;
                });

                options.AddEnumsWithValuesFixFilters();
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = Configuration["Jwt:Issuer"],
                            ValidAudience = Configuration["Jwt:Issuer"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                        };
                    });
            var builder = new ContainerBuilder();
            builder.Populate(services);
            ApiFactory.RegisterDependencies(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tazeez v1"));
            }

            app.UseCors("TazeezPolicy");

            app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
