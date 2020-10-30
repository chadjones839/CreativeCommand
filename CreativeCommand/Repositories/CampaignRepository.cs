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
                Audience = reader.GetInt32(reader.GetOrdinal("Audience")) ,
                AccountId = reader.GetInt32(reader.GetOrdinal("AccountId")),
                Account = new Account()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("AccountId")),
                    Company = reader.GetString(reader.GetOrdinal("Company")),
                    Address = reader.GetString(reader.GetOrdinal("Address")),
                    City = reader.GetString(reader.GetOrdinal("City")),
                    State = reader.GetString(reader.GetOrdinal("State")),
                    ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode")),
                    Logo = DbUtils.GetNullableString(reader, "Logo"),
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
                       SELECT c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                              c.StartDate, c.EndDate, c.Impressions, c.Audience,

                              a.Id, a.Company, a.Logo, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId,

                              u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId,

                              um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                              um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                              s.Id, s.Name AS ScheduleTypeName,

                              p.Id, p.Name AS PlatformName

                         FROM Campaign c
                              LEFT JOIN Account a ON c.AccountId = a.Id
                              LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                              LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
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

        public List<Campaign> GetAllCampaignsByAccountId(int accountId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                              c.StartDate, c.EndDate, c.Impressions, c.Audience,

                              a.Id, a.Company, a.Logo, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId,

                              u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId,

                              um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                              um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                              s.Id, s.Name AS ScheduleTypeName,

                              p.Id, p.Name AS PlatformName

                         FROM Campaign c
                              LEFT JOIN Account a ON c.AccountId = a.Id
                              LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                              LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                              LEFT JOIN ScheduleType s ON c.ScheduleTypeId = s.Id
                              LEFT JOIN Platform p ON c.PlatformId = p.Id
                          WHERE a.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", accountId);

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
                       SELECT c.Id, c.Title, c.AccountId, c.Revenue, c.ScheduleTypeId, c.PlatformId, c.CreateDate, 
                              c.StartDate, c.EndDate, c.Impressions, c.Audience,

                              a.Id, a.Company, a.Logo, a.Address, a.City, a.State, a.ZipCode, a.SalesUserId, a.ManagerUserId,

                              u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId,

                              um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                              um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                              s.Id, s.Name AS ScheduleTypeName,

                              p.Id, p.Name AS PlatformName

                         FROM Campaign c
                              LEFT JOIN Account a ON c.AccountId = a.Id
                              LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                              LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
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

        public Campaign GetBookedCampaignRevenue(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT SUM(c.Revenue) AS BookedRevenue
                         FROM Campaign c
                    LEFT JOIN Account a ON c.AccountId = a.id
                    LEFT JOIN UserProfile up ON a.SalesUserId = up.Id
                    LEFT JOIN CampaignStatus cs ON cs.CampaignId = c.Id
                        WHERE up.Id = @Id AND cs.IsApproved = 0";

                    DbUtils.AddParameter(cmd, "@Id", userId);

                    Campaign campaign = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        return new Campaign()
                        {
                            Revenue = reader.GetInt32(reader.GetOrdinal("BookedRevenue"))
                        };          
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
                    cmd.CommandText = @"INSERT INTO Campaign (AccountId, Title, Revenue, ScheduleTypeId, PlatformId, CreateDate,
                                                              StartDate, EndDate, Impressions, Audience)
                                        OUTPUT INSERTED.ID
                                        VALUES (@AccountId, @Title, @Revenue, @ScheduleTypeId, @PlatformId, @CreateDate, @StartDate,
                                                @EndDate, @Impressions, @Audience)";
                    DbUtils.AddParameter(cmd, "@AccountId", campaign.AccountId);
                    DbUtils.AddParameter(cmd, "@Title", campaign.Title);
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
                                AccountId = @accountId, 
                                Title = @title,
                                Revenue = @revenue,
                                ScheduleTypeId = @scheduleTypeId, 
                                PlatformId = @platformId,
		                        CreateDate = @createDate,
                                StartDate = @startDate,
                                EndDate = @endDate,
                                Impressions = @impressions,
                                Audience = @audience
                            WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", campaign.Id);
                    cmd.Parameters.AddWithValue("@title", campaign.Title);
                    cmd.Parameters.AddWithValue("@accountId", campaign.AccountId);
                    cmd.Parameters.AddWithValue("@revenue", campaign.Revenue);
                    cmd.Parameters.AddWithValue("@scheduleTypeId", campaign.ScheduleTypeId);
                    cmd.Parameters.AddWithValue("@platformId", campaign.PlatformId);
                    cmd.Parameters.AddWithValue("@createDate", campaign.CreateDate);
                    cmd.Parameters.AddWithValue("@startDate", campaign.StartDate);
                    cmd.Parameters.AddWithValue("@endDate", campaign.EndDate);
                    cmd.Parameters.AddWithValue("@impressions", campaign.Impressions);
                    cmd.Parameters.AddWithValue("@audience", campaign.Audience);
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
