using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using CreativeCommand.Models;
using CreativeCommand.Utils;


namespace CreativeCommand.Repositories
{
    public class CampaignRepository : BaseRepository, ICampaignRepository
    {
        public CampaignRepository(IConfiguration config) : base(config) { }

        private Campaign NewCampaignFromReader(SqlDataReader reader)
        {
            return new Campaign()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
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
                    Company = reader.GetString(reader.GetOrdinal("Company")),
                    SalesUserId = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                    SalesUser = new User()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                        FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
                        Email = reader.GetString(reader.GetOrdinal("Email")),
                        UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId"))
                    },
                    ManagerUserId = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                    ManagerUser = new User()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                        FirebaseUserId = reader.GetString(reader.GetOrdinal("ManagerFirebaseId")),
                        FirstName = reader.GetString(reader.GetOrdinal("ManagerFirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("ManagerLastName")),
                        Email = reader.GetString(reader.GetOrdinal("ManagerEmail")),
                        UserTypeId = reader.GetInt32(reader.GetOrdinal("ManagerUserTypeId"))
                    }
                }
            };
        }

        public List<Campaign> GetAllCampaigns()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                              c.StartDate, c.EndDate, c.Impressions, c.Audience,

                              a.Id, a.Company, a.SalesUserId, a.ManagerUserId,

                              u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId,

                              um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                              um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                              s.Id, s.Name AS ScheduleTypeName,

                              p.Id, p.Name AS PlatformName

                         FROM Campaign c
                              LEFT JOIN Account a ON c.AccountId = a.Id
                              LEFT JOIN [User] u ON a.SalesUserId = u.Id
                              LEFT JOIN [User] um ON a.ManagerUserId = um.Id
                              LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                              LEFT JOIN Platform p ON c.PlatformId = p.Id";
                    var reader = cmd.ExecuteReader();

                    var campaigns = new List<Campaign>();

                    while (reader.Read())
                    {
                        campaigns.Add(NewCampaignFromReader(reader));
                    }

                    reader.Close();

                    return campaigns;
                }
            };
        }
        public Campaign GetCampaignById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                              c.StartDate, c.EndDate, c.Impressions, c.Audience,

                              a.Id, a.Company, a.SalesUserId, a.ManagerUserId,

                              u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId,

                              um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                              um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                              s.Id, s.Name AS ScheduleTypeName,

                              p.Id, p.Name AS PlatformName

                         FROM Campaign c
                              LEFT JOIN Account a ON c.AccountId = a.Id
                              LEFT JOIN [User] u ON a.SalesUserId = u.Id
                              LEFT JOIN [User] um ON a.ManagerUserId = um.Id
                              LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                              LEFT JOIN Platform p ON c.PlatformId = p.Id
                        WHERE c.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Campaign campaign = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        campaign = NewCampaignFromReader(reader);
                    }
                    reader.Close();

                    return campaign;
                }
            }
        }

        public void Add(Campaign campaign)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Campaign (AccountId, Revenue, ScheduleTypeId, PlatformId, CreateDate,
                                                              StartDate, EndDate, Impressions, Audience)
                                        OUTPUT INSERTED.ID
                                        VALUES (@AccountId, @Revenue, @ScheduleTypeId, @PlatformId, @CreateDate, @StartDate,
                                                @EndDate, @Impressions, @Audience)";
                    DbUtils.AddParameter(cmd, "@AccountId", campaign.AccountId);
                    DbUtils.AddParameter(cmd, "@Revenue", campaign.Revenue);
                    DbUtils.AddParameter(cmd, "@ScheduleTypeId", campaign.ScheduleTypeId);
                    DbUtils.AddParameter(cmd, "@PlatformId", campaign.PlatformId);
                    DbUtils.AddParameter(cmd, "@CreateDate", campaign.CreateDate);
                    DbUtils.AddParameter(cmd, "@StartDate", campaign.StartDate);
                    DbUtils.AddParameter(cmd, "@EndDate", campaign.EndDate);
                    DbUtils.AddParameter(cmd, "@Impressions", campaign.Impressions);
                    DbUtils.AddParameter(cmd, "@Audience", campaign.Audience);

                    campaign.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Campaign campaign)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Campaign
                            SET 
                                AccountId = @AccountId, 
                                Revenue = @Revenue,
                                ScheduleTypeId = @ScheduleTypeId, 
                                PlatformId = @PlatformId,
		                        CreateDate = @CreateDate,
                                StartDate = @StartDate,
                                EndDate = @EndDate,
                                Impressions = @Impressions,
                                Audience = @Audience
                            WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", campaign.Id);
                    DbUtils.AddParameter(cmd, "@AccountId", campaign.AccountId);
                    DbUtils.AddParameter(cmd, "@Revenue", campaign.Revenue);
                    DbUtils.AddParameter(cmd, "@ScheduleTypeId", campaign.ScheduleTypeId);
                    DbUtils.AddParameter(cmd, "@PlatformId", campaign.PlatformId);
                    DbUtils.AddParameter(cmd, "@CreateDate", campaign.CreateDate);
                    DbUtils.AddParameter(cmd, "@StartDate", campaign.StartDate);
                    DbUtils.AddParameter(cmd, "@EndDate", campaign.EndDate);
                    DbUtils.AddParameter(cmd, "@Impressions", campaign.Impressions);
                    DbUtils.AddParameter(cmd, "@Audience", campaign.Audience);
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
                            DELETE FROM Campaign
                            WHERE Id = @id
                        ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
