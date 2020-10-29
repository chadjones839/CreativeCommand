USE [CreativeCommand];
GO

set identity_insert [UserType] on
insert into [UserType] ([Id], [Name]) VALUES (1, 'Manager'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [ScheduleType] on
insert into [ScheduleType] ([Id], [Name]) VALUES (1, 'Annual'), (2, 'Flight'), (3, 'Seasonal');
set identity_insert [ScheduleType] off

set identity_insert [User] on
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email, ImageUrl, UserTypeId) values (1, 'wza8zqGbdRSGjJRESfMWadGpsd93', 'Tommy', 'Trainwreck', 'tommytrainwreck@bigrick.comx', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1603726684/Users/shelleylevene_oiiqeo.png', 1);
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email, UserTypeId) values (2, '1D3K3em6pwgHpsQclNmc2nOQwy93', 'Bill', 'Brasky', 'billbrasky@bigrick.comx', NULL, 2);
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email, UserTypeId) values (3, '9LyGobdAWKclCqNyy2x9GHJYE053', 'Shelley', 'Levene', 'shelleylevene@bigrick.comx', NULL, 2);
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email, UserTypeId) values (4, 'N3ub2hJa8vOf5Gf4ATQxq2fRMby2', 'John', 'Williamson', 'johnwilliamson@bigrick.comx', NULL, 1);
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email, UserTypeId) values (5, 'vzcQcIaAAOOOvXMUkaOfnrBlERz2', 'Richard', 'Roma', 'richardroma@bigrick.comx', NULL, 2);
set identity_insert [User] off

set identity_insert [Account] on
insert into Account (Id, Company, Logo, [Address], City, [State], ZipCode, DateCreated, SalesUserId, ManagerUserId) values (1, 'Action Park', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1603729081/Accounts/actionpark_ra8pgb.jpg', '200 NJ-94', 'Vernon Township', 'NJ', 070462, '1984-02-20', 2, 1);
insert into Account (Id, Company, Logo, [Address], City, [State], ZipCode, DateCreated, SalesUserId, ManagerUserId) values (2, 'Clams Casino', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1603729114/Accounts/ClamsCasino_rd21rg.jpg', '3900 Las Vegas Blvd', 'Las Vegas', 'NV', 89119, '2015-05-10', 2, 1);
insert into Account (Id, Company, Logo, [Address], City, [State], ZipCode, DateCreated, SalesUserId, ManagerUserId) values (3, 'Coca Cola', 'https://res.cloudinary.com/dhduglm4j/image/upload/v1603729353/Accounts/cocacola_nr5rqi.png', '1 Coca Cola Plz', 'Atlanta', 'GA', 30313, '2017-07-05', 2, 1);
insert into Account (Id, Company, Logo, [Address], City, [State], ZipCode, DateCreated, SalesUserId, ManagerUserId) values (4, 'Hanks Autobody', NULL, '15 Meat Street', 'New York', 'NY', 12110, '2016-07-05', 3, 1);
set identity_insert [Account] off

set identity_insert [Campaign] on
insert into Campaign (Id, SalesUserId, ManagerUserId, AccountId, Revenue, ScheduleTypeId, PlatformId, CreateDate, StartDate, EndDate, Impressions, Audience) values (1, 2, 1, 1, 55000, 2, 1, '2020-03-20', '2020-05-20', '2020-09-15', 560000, 880000);
insert into Campaign (Id, SalesUserId, ManagerUserId, AccountId, Revenue, ScheduleTypeId, PlatformId, CreateDate, StartDate, EndDate, Impressions, Audience) values (2, 2, 1, 3, 250500, 1, 1, '2020-10-15', '2021-01-01', '2021-12-31', 3754389, 1200000);
set identity_insert [Campaign] off

set identity_insert [CampaignStatus] on
insert into CampaignStatus (Id, CampaignId, SalesUserId, ManagerUserId, IsSold, IsApproved, CreativeSubmitted, InProduction, IsScheduled, IsComplete) values (1, 1, 2, 1, 1, 1, 1, 1, 1, 1);
insert into CampaignStatus (Id, CampaignId, SalesUserId, ManagerUserId, IsSold, IsApproved, CreativeSubmitted, InProduction, IsScheduled, IsComplete) values (2, 2, 2, 1, 1, 1, 1, 0, 0, 0);
set identity_insert [CampaignStatus] off

set identity_insert [Platform] on
insert into [Platform] ([Id], [Name]) VALUES (1, 'Radio'), (2, 'TV'), (3, 'Programmatic Display'), (4, 'GeoFencing'), (5, 'Social'), (6, 'Email');
set identity_insert [Platform] off