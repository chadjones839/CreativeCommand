﻿using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using CreativeCommand.Models;
using CreativeCommand.Utils;

namespace CreativeCommand.Repositories
{
    public class AccountRepository : BaseRepository, IAccountRepository
    {
        public AccountRepository(IConfiguration config) : base(config) { }

        private Account NewAccountFromReader(SqlDataReader reader)
        {
            return new Account()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Company = reader.GetString(reader.GetOrdinal("Company")),
                Address = reader.GetString(reader.GetOrdinal("Address")),
                City = reader.GetString(reader.GetOrdinal("City")),
                State = reader.GetString(reader.GetOrdinal("State")),
                ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode")),
                SalesUserId = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                SalesUser = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                },
                ManagerUserId = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                ManagerUser = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("ManagerFirebaseId")),
                    FirstName = reader.GetString(reader.GetOrdinal("ManagerFirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("ManagerLastName")),
                    Email = reader.GetString(reader.GetOrdinal("ManagerEmail")),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("ManagerUserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("ManagerUserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("ManagerUserTypeName"))
                    }
                }
            };
        }

        public List<Account> GetAllAccounts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT a.Id, a.Company, a.Address, a.City, a.State, a.ZipCode,
                              a.DateCreated, a.SalesUserId, a.ManagerUserId,

                              u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId,

                              um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                              um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                              ut.Id, ut.[Name] AS UserTypeName,

                              mut.Id, mut.[Name] AS ManagerUserTypeName
                         FROM Account a
                              LEFT JOIN [User] u ON a.SalesUserId = u.Id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                              LEFT JOIN [User] um ON a.ManagerUserId = um.Id
                              LEFT JOIN UserType mut ON um.UserTypeId = mut.Id";
                    var reader = cmd.ExecuteReader();

                    var accounts = new List<Account>();

                    while (reader.Read())
                    {
                        accounts.Add(NewAccountFromReader(reader));
                    }

                    reader.Close();

                    return accounts;
                }
            };
        }
        public Account GetAccountById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT a.Id, a.Company, a.Address, a.City, a.State, a.ZipCode,
                              a.DateCreated, a.SalesUserId, a.ManagerUserId,

                              u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.Email,
                              u.UserTypeId,

                              um.Id AS ManagerId, um.FirebaseUserId AS ManagerFirebaseId, um.FirstName AS ManagerFirstName, 
                              um.LastName AS ManagerLastName, um.Email AS ManagerEmail, um.UserTypeId AS ManagerUserTypeId,

                              ut.Id, ut.[Name] AS UserTypeName,

                              mut.Id, mut.[Name] AS ManagerUserTypeName
                         FROM Account a
                              LEFT JOIN [User] u ON a.SalesUserId = u.Id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                              LEFT JOIN [User] um ON a.ManagerUserId = um.Id
                              LEFT JOIN UserType mut ON um.UserTypeId = mut.Id
                        WHERE a.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Account account = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        account = NewAccountFromReader(reader);
                    }
                    reader.Close();

                    return account;
                }
            }
        }

        public void Add(Account account)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Account (Company, Address, City, State, ZipCode, DateCreated,
                                                            SalesUserId, ManagerUserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Company, @Address, @City, @State, @ZipCode, 
                                                @DateCreated, @SalesUserId, @ManagerUserId)";
                    DbUtils.AddParameter(cmd, "@Company", account.Company);
                    DbUtils.AddParameter(cmd, "@Address", account.Address);
                    DbUtils.AddParameter(cmd, "@City", account.City);
                    DbUtils.AddParameter(cmd, "@State", account.State);
                    DbUtils.AddParameter(cmd, "@ZipCode", account.ZipCode);
                    DbUtils.AddParameter(cmd, "@DateCreated", account.DateCreated);
                    DbUtils.AddParameter(cmd, "@SalesUserId", account.SalesUserId);
                    DbUtils.AddParameter(cmd, "@ManagerUserId", account.ManagerUserId);

                    account.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Account account)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Account
                            SET 
                                Company = @company, 
                                Address = @address,
                                City = @city, 
                                State = @state,
		                        ZipCode = @zipCode,
                                DateCreated = @dateCreated,
                                SalesUserId = @salesUserId,
                                ManagerUserId = @managerUserId
                            WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", account.Id);
                    cmd.Parameters.AddWithValue("@company", account.Company);
                    cmd.Parameters.AddWithValue("@address", account.Address);
                    cmd.Parameters.AddWithValue("@city", account.City);
                    cmd.Parameters.AddWithValue("@state", account.State);
                    cmd.Parameters.AddWithValue("@zipCode", account.ZipCode);
                    cmd.Parameters.AddWithValue("@dateCreated", account.DateCreated);
                    cmd.Parameters.AddWithValue("@salesUserId", account.SalesUserId);
                    cmd.Parameters.AddWithValue("@managerUserId", account.ManagerUserId);
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
                            DELETE FROM Account
                            WHERE Id = @id
                        ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
