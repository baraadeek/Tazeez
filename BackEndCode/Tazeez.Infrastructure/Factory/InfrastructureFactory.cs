// --------------------------------------------------------------------------------------------------------------------
// <copyright file="InfrastructureFactory.cs" company="JustProtect">
//   Copyright (C) 2017. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using Microsoft.Extensions.DependencyInjection;
using Tazeez.Infrastructure.Caching;
using Tazeez.Infrastructure.Implementation;

namespace Tazeez.Infrastructure.Factory
{
    public static class InfrastructureFactory
    { 
        public static void RegisterDependencies(IServiceCollection services)
        {
           // services.AddScoped<ICacheManager, MemoryCacheManager>();
            services.AddScoped<IConfigurationSettings, ConfigurationSettings>();
        }
    }
}