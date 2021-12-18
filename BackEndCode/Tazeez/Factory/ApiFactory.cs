// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ApiFactory.cs" company="Tazeez">
//   Copyright (C) 2021. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using Tazeez.Core.Factory;
using Microsoft.Extensions.DependencyInjection;

namespace Tazeez.Factory
{
    public static class ApiFactory
    {
        public static void RegisterDependencies(IServiceCollection services)
        {
            DataManagerFactory.RegisterDependencies(services);
        }
    }
}
