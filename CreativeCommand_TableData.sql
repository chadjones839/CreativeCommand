USE [master]

IF db_id('CreativeCommand') IS NULL
  CREATE DATABASE [CreativeCommand]
GO

USE [CreativeCommand]
GO


DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Accounts];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Subscription];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] varchar(20) NOT NULL
)

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirebaseUserId] varchar(255) NOT NULL,
  [FirstName] varchar(25) NOT NULL,
  [LastName] varchar(25) NOT NULL,
  [Email] varchar(100) NOT NULL,
  [UserTypeId] int NOT NULL,

  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Account] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Company] varchar(72) NOT NULL,
  [Address] varchar(62) NOT NULL,
  [City] varchar(48) NOT NULL,
  [State] varchar(2) NOT NULL,
  [ZipCode] integer NOT NULL,
  [DateCreated] datetime NOT NULL,
  [SalesUserId] integer NOT NULL,
  [ManagerUserId] integer NOT NULL,

  CONSTRAINT [FK_Account_User_SalesUser] FOREIGN KEY ([SalesUserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_Account_User_ManagerUser] FOREIGN KEY ([ManagerUserId]) REFERENCES [User] ([Id])
)

CREATE TABLE [ManagerTeam] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ManagerUserId] integer NOT NULL,
  [SalesUserId] integer NOT NULL,

  CONSTRAINT [FK_ManagerTeam_User_SalesUser] FOREIGN KEY ([SalesUserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_ManagerTeam_User_ManagerUser] FOREIGN KEY ([ManagerUserId]) REFERENCES [User] ([Id])
)

CREATE TABLE [Notes] (
  [Id] integer PRIMARY KEY IDENTITY,
  [AccountId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [Title] varchar(255) NOT NULL,
  [Content] varchar(255) NOT NULL
)

CREATE TABLE [ScheduleType] (
[Id] integer PRIMARY KEY IDENTITY,
[Name] varchar(50) NOT NULL
)

CREATE TABLE [Campaign] (
  [Id] integer PRIMARY KEY IDENTITY,
  [AccountId] int NOT NULL,
  [Revenue] integer NOT NULL,
  [ScheduleTypeId] int NOT NULL,
  [PlatformId] integer NOT NULL,
  [CreateDate] date NOT NULL,
  [StartDate] date NOT NULL,
  [EndDate] date NOT NULL,
  [Impressions] int,
  [Audience] int,

  CONSTRAINT [FK_Campaign_Account] FOREIGN KEY ([AccountId]) REFERENCES [Account] ([Id])
)

CREATE TABLE [Platform] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] varchar(30) NOT NULL
)

CREATE TABLE [CampaignStatus] (
  [Id] integer PRIMARY KEY IDENTITY,
  [CampaignId] integer NOT NULL,
  [IsSold] bit NOT NULL,
  [IsApproved] bit NOT NULL,
  [CreativeSubmitted] bit NOT NULL,
  [InProduction] bit NOT NULL,
  [IsScheduled] bit NOT NULL,
  [IsComplete] bit NOT NULL,

  CONSTRAINT [FK_CampaignStatus_User_SalesUser] FOREIGN KEY ([SalesUserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_CampaignStatus_User_ManagerUser] FOREIGN KEY ([ManagerUserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_CampaignStatus_Campaign] FOREIGN KEY ([CampaignId]) REFERENCES [Campaign] ([Id])
)

GO