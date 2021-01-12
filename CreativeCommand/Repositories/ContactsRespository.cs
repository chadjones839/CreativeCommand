using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using CreativeCommand.Models;
using CreativeCommand.Utils;

namespace CreativeCommand.Repositories
{
    public class ContactsRepository : BaseRepository, IContactsRepository
    {
        public ContactsRepository(IConfiguration config) : base(config) { }

        private Contact NewContactFromReader(SqlDataReader reader)
        {
            return new Contact()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                FirstName = DbUtils.GetNullableString(reader, "FirstName"),
                LastName = DbUtils.GetNullableString(reader, "LastName"),
                Title = DbUtils.GetNullableString(reader, "Title"),
                CellPhone = DbUtils.GetNullableInt(reader, "CellPhone"),
                OfficePhone = DbUtils.GetNullableInt(reader, "OfficePhone"),
                Email = DbUtils.GetNullableString(reader, "Email"),
                AccountId = reader.GetInt32(reader.GetOrdinal("Id")),
                Account = new Account()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Company = reader.GetString(reader.GetOrdinal("Company")),
                    Logo = DbUtils.GetNullableString(reader, "Logo"),
                    Address = reader.GetString(reader.GetOrdinal("Address")),
                    City = reader.GetString(reader.GetOrdinal("City")),
                    State = reader.GetString(reader.GetOrdinal("State")),
                    ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode")),
                    DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                    SalesUserId = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                    SalesUser = new UserProfile()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("SalesUserId")),
                        FirstName = reader.GetString(reader.GetOrdinal("SalesFirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("SalesLastName"))
                    },
                    ManagerUserId = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                    ManagerUser = new UserProfile()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("ManagerUserId")),
                        FirstName = reader.GetString(reader.GetOrdinal("ManagerFirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("ManagerLastName"))
                    },
                    IsLead = reader.GetBoolean(reader.GetOrdinal("IsLead"))
                }
            };
        }

        public List<Contact> GetAllContacts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT c.id, c.FirstName, c.LastName, c.Title, c.CellPhone, c.OfficePhone, c.Email, c.AccountId,

                            a.Id, a.Company, a.Logo, a.Address, a.City, a.State, a.ZipCode,
                            a.DateCreated, a.SalesUserId, a.ManagerUserId, a.isLead,

                            u.Id, u.FirstName AS SalesFirstName, u.LastName AS SalesLastName, um.Id AS ManagerId, um.FirstName AS ManagerFirstName, 
                            um.LastName AS ManagerLastName

                        FROM Contacts c
                            LEFT JOIN Account a ON a.Id = c.AccountId
                            LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                            LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                    ORDER BY a.Company ASC";
                    var reader = cmd.ExecuteReader();

                    var contacts = new List<Contact>();

                    while (reader.Read())
                    {
                        contacts.Add(NewContactFromReader(reader));
                    }

                    reader.Close();

                    return contacts;
                }
            };
        }

        public Contact GetContactByAccountId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT c.id, c.FirstName, c.LastName, c.Title, c.CellPhone, c.OfficePhone, c.Email, c.AccountId,

                            a.Id, a.Company, a.Logo, a.Address, a.City, a.State, a.ZipCode,
                            a.DateCreated, a.SalesUserId, a.ManagerUserId, a.isLead,

                            u.Id, u.FirstName AS SalesFirstName, u.LastName AS SalesLastName, um.Id AS ManagerId, um.FirstName AS ManagerFirstName, 
                            um.LastName AS ManagerLastName

                        FROM Contacts c
                            LEFT JOIN Account a ON a.Id = c.AccountId
                            LEFT JOIN UserProfile u ON a.SalesUserId = u.Id
                            LEFT JOIN UserProfile um ON a.ManagerUserId = um.Id
                    WHERE a.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Contact contact = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        contact = NewContactFromReader(reader);
                    }
                    reader.Close();

                    return contact;
                }
            }
        }


    }
}