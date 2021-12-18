﻿CREATE TABLE [dbo].[ContactRequestModel] (
  [Id] INT CHECK ([Id] > 0) NOT NULL IDENTITY,
  [FirstName] VARCHAR(255) NOT NULL DEFAULT '',
  [LastName] VARCHAR(225) NOT NULL DEFAULT '',
  [Email] VARCHAR(255) NOT NULL DEFAULT '',
  [PhoneNumber] VARCHAR(45) NOT NULL DEFAULT '',
  [Message] Text NOT NULL DEFAULT '',
  [CreatedDate] DATETIME2(0) NOT NULL DEFAULT GETDATE(),
  [UpdateDate] DATETIME2(0) NOT NULL DEFAULT GETDATE(),
  [Archived] SMALLINT NOT NULL DEFAULT 0,
  PRIMARY KEY ([Id]));
