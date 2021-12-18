using System.Linq;

using Autofac;
using Autofac.Core;
using Autofac.Core.Registration;
using log4net;
using Serilog;

namespace JustProtect.Infrastructure
{
    /// <summary>
    /// The log injection module.
    /// </summary>
    public class LogInjectionModule : Module
    {
        /// <summary>
        /// Attaches to component registration.
        /// </summary>
        /// <param name="componentRegistry">The registry.</param>
        /// <param name="registration">The registration.</param>
        protected override void AttachToComponentRegistration(IComponentRegistryBuilder componentRegistry, IComponentRegistration registration)
        {
            base.AttachToComponentRegistration(componentRegistry, registration);
            registration.Preparing += OnComponentPreparing;
        }
        /// <summary>
        /// Called when [component preparing].
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="PreparingEventArgs"/> instance containing the event data.</param>
        private static void OnComponentPreparing(object sender, PreparingEventArgs e)
        {
            var t = e.Component.Activator.LimitType;
            e.Parameters = e.Parameters.Union(new[] 
                            {
                                new ResolvedParameter((p, i) => p.ParameterType == typeof(Log),
                                                        (p, i) => LogManager.GetLogger(t))
                            });
        }
    }
}