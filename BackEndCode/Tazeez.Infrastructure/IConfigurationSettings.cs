// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IConfigurationSettings.cs" company="JustProtect">
//   Copyright (C) 2017. All rights reserved.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace Tazeez.Infrastructure
{
    using System;
    using System.Collections.Generic;

    public interface IConfigurationSettings
    {
        ///// <summary>
        ///// Gets the database connection string.
        ///// </summary>
        //string DatabaseConnectionString { get; }

        //string OSCALDatabaseConnectionString { get; }

        //string DatabaseConnectionStringForONET { get; }

        /// <summary>
        /// Gets or the default cache duration.
        /// </summary>
        TimeSpan DefaultCacheDuration { get; }

        string Issuer { get; }

        string JwtKey { get; }


        //string WebSiteURl { get; }

        //string DashboardEmbeddedUrl { get; }

        //string StripeSecretKey { get; }

        //string SendWithUsKey { get; }

        //string JustProtectUrl { get; }

        //string SendWithUsEnv_Mode { get; }

        //bool IsDevelopmentEnv { get; }

        //bool IsLocalEnv { get; }

        //string AuthApiClientId { get; }
        
        //bool IsCloudSearchEnabled { get; }

        //string JustProtectLogoURL { get; }

        //string AuthApiClientSecret { get; }

        //string ConnectionId { get; }

        //string Auth0Url { get; }

        //string Auth0TenantURL { get; }

        //string AuthConnection { get; }

        //string AuthApiIdentifier { get; }

        //string JustProtectSignupUrl { get; }

        //string WelcomeEmailTemplate { get; }

        //string InvitationTemplate { get; }

        //string NotificationTemplate { get; }

        //string RecoverResetOldInvitationTemplate { get; }

        //string NewNotificationTemplate { get; }

        //string ClearbitSuggesstionApiUrl { get; }

        //string ClearbitEnrichmentApiUrl { get; }

        //string ClearbitSecretKey { get; }

        //string EmailToReceivePendingFixTemplate { get; }

        //List<string> SuperAdmins { get; }
        
        //string CognitoAuthRoleARN { get; }

        //string CognitoAuthRoleName { get; }

        //string AWSAccountID { get; }

        //string AWSDashboard { get; }

        //int SessionTimeout { get; }

        //string QuickSightSqlBucketName { get; }

        //string S3URL { get; }

        //string SlacBaseURL { get; }

        //string HubspotToken { get; }

        //string HubSpotBaseUrl { get; }

        //string SPF { get; }
    }
}