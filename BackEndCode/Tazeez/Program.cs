using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Compact;
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

                Log.Logger = new LoggerConfiguration()
                            .Enrich.FromLogContext()
                            .MinimumLevel.Information()
                            .MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", LogEventLevel.Warning)
                            .WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day)
                            .CreateLogger();

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
