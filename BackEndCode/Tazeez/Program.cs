using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.IO;

namespace Tazeez
{
    public class Program
    {
        public static int Main(string[] args)
        {
            try
            {
                Log.Information("Starting host");

                var host = Host.CreateDefaultBuilder(args)
                            .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                            .ConfigureWebHostDefaults(webHostBuilder => {
                                webHostBuilder
                                      .UseContentRoot(Directory.GetCurrentDirectory())
                                      .UseIISIntegration()
                                      .UseStartup<Startup>();
                            })
                            .Build();
                host.Run();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}
