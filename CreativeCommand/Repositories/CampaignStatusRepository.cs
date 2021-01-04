using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using CreativeCommand.Models;
using CreativeCommand.Utils;

namespace CreativeCommand.Repositories
{

    public class CampaignStatusRepository : BaseRepository, ICampaignStatusRepository
    {
        public CampaignStatusRepository(IConfiguration config) : base(config) { }

        private CampaignStatus NewCampaignStatusFromReader(SqlDataReader reader)
        {
            return new CampaignStatus()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                IsSold = reader.GetBoolean(reader.GetOrdinal("IsSold")),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                CreativeSubmitted = reader.GetBoolean(reader.GetOrdinal("CreativeSubmitted")),
                InProduction = reader.GetBoolean(reader.GetOrdinal("InProduction")),
                IsScheduled = reader.GetBoolean(reader.GetOrdinal("IsScheduled")),
                IsComplete = reader.GetBoolean(reader.GetOrdinal("IsComplete")),
                CampaignId = reader.GetInt32(reader.GetOrdinal("CampaignId")),
                Campaign = new Campaign()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Title = reader.GetString(reader.GetOrdinal("Title")),
                    Revenue = reader.GetInt32(reader.GetOrdinal("Revenue")),
                    ScheduleTypeId = reader.GetInt32(reader.GetOrdinal("ScheduleTypeId")),
                    ScheduleType = new ScheduleType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("ScheduleTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("ScheduleTypeName"))
                    },
                    PlatformId = reader.GetInt32(reader.GetOrdinal("PlatformId")),
                    Platform = new Platform()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("PlatformId")),
                        Name = reader.GetString(reader.GetOrdinal("PlatformName"))
                    },
                    CreateDate = reader.GetDateTime(reader.GetOrdinal("CreateDate")),
                    StartDate = reader.GetDateTime(reader.GetOrdinal("StartDate")),
                    EndDate = reader.GetDateTime(reader.GetOrdinal("EndDate")),
                    Impressions = reader.GetInt32(reader.GetOrdinal("Impressions")),
                    Audience = reader.GetInt32(reader.GetOrdinal("Audience")),
                    AccountId = reader.GetInt32(reader.GetOrdinal("AccountId")),
                    Account = new Account()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("AccountId")),
                        Logo = DbUtils.GetNullableString(reader, "Logo"),
                        Company = reader.GetString(reader.GetOrdinal("Company")),
                        Address = reader.GetString(reader.GetOrdinal("Address")),
                        City = reader.GetString(reader.GetOrdinal("City")),
                        State = reader.GetString(reader.GetOrdinal("State")),
                        ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode")),
                        SalesUserId = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                        SalesUser = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId"))
                        },
                        ManagerUserId = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                        ManagerUser = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("ManagerFirebaseId")),
                            FirstName = reader.GetString(reader.GetOrdinal("ManagerFirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("ManagerLastName")),
                            Email = reader.GetString(reader.GetOrdinal("ManagerEmail")),
                            UserTypeId = reader.GetInt32(reader.GetOrdinal("ManagerUserTypeId"))
                        },
                        IsLead = reader.GetBoolean(reader.GetOrdinal("IsLead"))
                    }
                }
            };
        }

        public List<CampaignStatus> GetAllCampaignStatuses()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT cs.Id, cs.CampaignId, cs.IsSold, cs.IsApproved, cs.CreativeSubmitted, 
                            cs.InProduction, cs.IsScheduled, cs.IsComplete,

                            c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                            c.StartDate, c.EndDate, c.Impressions, c.Audience,

                            a.Id, a.Logo, a.Company, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId, 
                            a.IsLead,

                            u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                            u.UserTypeId,

                            um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                            um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                            s.Id, s.Name AS ScheduleTypeName,

                            p.Id, p.Name AS PlatformName

                        FROM CampaignStatus cs
                            LEFT JOIN Campaign c On cs.CampaignId = c.Id
                            LEFT JOIN Account a ON c.AccountId = a.Id
                            LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                            LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                            LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                            LEFT JOIN Platform p ON c.PlatformId = p.Id";
                    var reader = cmd.ExecuteReader();

                    var campaigns = new List<CampaignStatus>();

                    while (reader.Read())
                    {
                        campaigns.Add(NewCampaignStatusFromReader(reader));
                    }

                    reader.Close();

                    return campaigns;
                }
            };
        }
        public CampaignStatus GetCampaignStatusById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT cs.Id, cs.CampaignId, cs.IsSold, cs.IsApproved, cs.CreativeSubmitted, 
                            cs.InProduction, cs.IsScheduled, cs.IsComplete,

                            c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                            c.StartDate, c.EndDate, c.Impressions, c.Audience,

                            a.Id, a.Logo, a.Company, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId,    
                            a.IsLead,

                            u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                            u.UserTypeId,

                            um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                            um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                            s.Id, s.Name AS ScheduleTypeName,

                            p.Id, p.Name AS PlatformName

                        FROM CampaignStatus cs
                            LEFT JOIN Campaign c On cs.CampaignId = c.Id
                            LEFT JOIN Account a ON c.AccountId = a.Id
                            LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                            LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                            LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                            LEFT JOIN Platform p ON c.PlatformId = p.Id
                    WHERE cs.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    CampaignStatus campaign = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        campaign = NewCampaignStatusFromReader(reader);
                    }
                    reader.Close();

                    return campaign;
                }
            }
        }

        public CampaignStatus GetByCampaignId(int campaignId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT cs.Id, cs.CampaignId, cs.IsSold, cs.IsApproved, cs.CreativeSubmitted, 
                            cs.InProduction, cs.IsScheduled, cs.IsComplete,

                            c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                            c.StartDate, c.EndDate, c.Impressions, c.Audience,

                            a.Id, a.Logo, a.Company, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId, 
                            a.IsLead,

                            u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                            u.UserTypeId,

                            um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                            um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                            s.Id, s.Name AS ScheduleTypeName,

                            p.Id, p.Name AS PlatformName

                        FROM CampaignStatus cs
                            LEFT JOIN Campaign c On cs.CampaignId = c.Id
                            LEFT JOIN Account a ON c.AccountId = a.Id
                            LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                            LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                            LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                            LEFT JOIN Platform p ON c.PlatformId = p.Id
                    WHERE cs.CampaignId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", campaignId);

                    CampaignStatus campaign = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        campaign = NewCampaignStatusFromReader(reader);
                    }
                    reader.Close();

                    return campaign;
                }
            }
        }

        public List<CampaignStatus> GetAllByCampaignId(int campaignId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT cs.Id, cs.CampaignId, cs.IsSold, cs.IsApproved, cs.CreativeSubmitted, 
                            cs.InProduction, cs.IsScheduled, cs.IsComplete,

                            c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                            c.StartDate, c.EndDate, c.Impressions, c.Audience,

                            a.Id, a.Logo, a.Company, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId, 
                            a.IsLead,

                            u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                            u.UserTypeId,

                            um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                            um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                            s.Id, s.Name AS ScheduleTypeName,

                            p.Id, p.Name AS PlatformName

                        FROM CampaignStatus cs
                            LEFT JOIN Campaign c On cs.CampaignId = c.Id
                            LEFT JOIN Account a ON c.AccountId = a.Id
                            LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                            LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                            LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                            LEFT JOIN Platform p ON c.PlatformId = p.Id
                    WHERE cs.CampaignId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", campaignId);


                    var reader = cmd.ExecuteReader();
                    var campaigns = new List<CampaignStatus>();

                    while (reader.Read())
                    {
                        campaigns.Add(NewCampaignStatusFromReader(reader));
                    }
                    reader.Close();

                    return campaigns;
                }
            }
        }

        public List<CampaignStatus> GetAllByCampaignAccountId(int accountId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT cs.Id, cs.CampaignId, cs.IsSold, cs.IsApproved, cs.CreativeSubmitted, 
                            cs.InProduction, cs.IsScheduled, cs.IsComplete,

                            c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                            c.StartDate, c.EndDate, c.Impressions, c.Audience,

                            a.Id, a.Logo, a.Company, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId, 
                            a.IsLead,

                            u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                            u.UserTypeId,

                            um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                            um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                            s.Id, s.Name AS ScheduleTypeName,

                            p.Id, p.Name AS PlatformName

                        FROM CampaignStatus cs
                            LEFT JOIN Campaign c On cs.CampaignId = c.Id
                            LEFT JOIN Account a ON c.AccountId = a.Id
                            LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                            LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                            LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                            LEFT JOIN Platform p ON c.PlatformId = p.Id
                    WHERE c.AccountId = @Id
                    ORDER BY c.StartDate ASC";

                    DbUtils.AddParameter(cmd, "@Id", accountId);


                    var reader = cmd.ExecuteReader();
                    var campaigns = new List<CampaignStatus>();

                    while (reader.Read())
                    {
                        campaigns.Add(NewCampaignStatusFromReader(reader));
                    }
                    reader.Close();

                    return campaigns;
                }
            }
        }

        public void Add(CampaignStatus campaignStatus)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO CampaignStatus (CampaignId, IsSold, IsApproved, CreativeSubmitted, InProduction, IsScheduled, IsComplete)
                                    OUTPUT INSERTED.ID
                                    VALUES (@CampaignId, @IsSold, @IsApproved, @CreativeSubmitted, @InProduction, @IsScheduled,
                                            @IsComplete)";
                    DbUtils.AddParameter(cmd, "@CampaignId", campaignStatus.CampaignId);
                    DbUtils.AddParameter(cmd, "@IsSold", campaignStatus.IsSold);
                    DbUtils.AddParameter(cmd, "@IsApproved", campaignStatus.IsApproved);
                    DbUtils.AddParameter(cmd, "@CreativeSubmitted", campaignStatus.CreativeSubmitted);
                    DbUtils.AddParameter(cmd, "@InProduction", campaignStatus.InProduction);
                    DbUtils.AddParameter(cmd, "@IsScheduled", campaignStatus.IsScheduled);
                    DbUtils.AddParameter(cmd, "@IsComplete", campaignStatus.IsComplete);

                    campaignStatus.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(CampaignStatus campaignStatus)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE CampaignStatus
                        SET 
                            CampaignId = @CampaignId, 
                            IsSold = @IsSold,
                            IsApproved = @IsApproved, 
                            CreativeSubmitted = @CreativeSubmitted,
		                    InProduction = @InProduction,
                            IsScheduled = @IsScheduled,
                            IsComplete = @IsComplete
                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", campaignStatus.Id);
                    DbUtils.AddParameter(cmd, "@CampaignId", campaignStatus.CampaignId);
                    DbUtils.AddParameter(cmd, "@IsSold", campaignStatus.IsSold);
                    DbUtils.AddParameter(cmd, "@IsApproved", campaignStatus.IsApproved);
                    DbUtils.AddParameter(cmd, "@CreativeSubmitted", campaignStatus.CreativeSubmitted);
                    DbUtils.AddParameter(cmd, "@InProduction", campaignStatus.InProduction);
                    DbUtils.AddParameter(cmd, "@IsScheduled", campaignStatus.IsScheduled);
                    DbUtils.AddParameter(cmd, "@IsComplete", campaignStatus.IsComplete);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM CampaignStatus
                        WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
        

