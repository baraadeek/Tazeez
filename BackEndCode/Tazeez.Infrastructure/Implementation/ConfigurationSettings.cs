using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using Tazeez.Infrastructure.Caching;

namespace Tazeez.Infrastructure.Implementation
{
    public class ConfigurationSettings : IConfigurationSettings
    {
        #region Private Variables

        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;

        #endregion Private Variables

        #region Constructors

        public ConfigurationSettings(IWebHostEnvironment env, IConfiguration config)
        {
            _config = config;
            _env = env;
        }

        #endregion Constructors

        #region Public Properties

        public TimeSpan DefaultCacheDuration
        {
            get
            {
                var minutes = int.Parse(_config["Cache:DefaultCacheDuration"]);
                return new TimeSpan(0, 0, minutes, 0);
            }
        }

        public string Issuer => _config["Jwt:Issuer"];

        public string JwtKey => _config["Jwt:Key"];

        public string Domain => _config["Domain"];

        public string DefaultConnectionString => _config["ConnectionString"];


        public string DatabaseConnectionString
        {
            get
            {
                return DefaultConnectionString;
            }
        }
        #endregion Public Properties

        #region Private Methods
        #endregion Private Methods
    }
}