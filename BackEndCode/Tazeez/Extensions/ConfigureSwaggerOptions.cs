using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;

namespace JustProtectPublicApi.Extensions
{
    public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
	{
		private readonly IApiVersionDescriptionProvider _provider;

		public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider) => _provider = provider;

		public void Configure(SwaggerGenOptions options)
		{
			// add a swagger document for each discovered API version
			// note: you might choose to skip or document deprecated API versions differently
			foreach (var description in _provider.ApiVersionDescriptions)
			{
				options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
			}
		}

		private static OpenApiInfo CreateInfoForApiVersion(ApiVersionDescription description)
		{
			var info = new OpenApiInfo()
			{
				Title = "JustProtect public APIs",
				Description = "Public Apis For JustProtect Application API",
				Contact = new OpenApiContact() { Name = "JustProtect LLC", Email = "info@justprotect.co", Url = new Uri("https://portal.justprotectdev.com")},
				Version = description.ApiVersion.ToString()
			};

			if (description.IsDeprecated)
			{
				info.Description += " This API version has been deprecated.";
			}

			return info;
		}
	}
}
