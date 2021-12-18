using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
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

      //  public string WebSiteURl => _config["URL:WebSiteURl"];

        #endregion Public Properties

        #region Private Methods

        //private string GetRdsDatabasePassword()
        //{
        //    string password;
        //    if (!_cacheManager.IsSet(CacheKeys.RDSPassword))
        //    {
        //        password = RDSAuthTokenGenerator.GenerateAuthToken(RegionEndpoint.GetBySystemName(AWSRegion), Host, Port, UserId);
        //        _cacheManager.Set(CacheKeys.RDSPassword, password, 10);
        //    }
        //    else
        //    {
        //        password = _cacheManager.Get<string>(CacheKeys.RDSPassword);
        //    }

        //    return password;
        //}

        //private string GetOSCALRdsDatabasePassword()
        //{
        //    string password;
        //    if (!_cacheManager.IsSet(CacheKeys.OSCALRDSPassword))
        //    {
        //        password = RDSAuthTokenGenerator.GenerateAuthToken(RegionEndpoint.GetBySystemName(AWSRegion), OSCALHost, Port, OSCALUserId);
        //        _cacheManager.Set(CacheKeys.OSCALRDSPassword, password, 10);
        //    }
        //    else
        //    {
        //        password = _cacheManager.Get<string>(CacheKeys.OSCALRDSPassword);
        //    }

        //    return password;
        //}

        #endregion Private Methods
    }
}