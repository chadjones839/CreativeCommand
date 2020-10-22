using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public class UserTypeRepository : BaseRepository, IUserTypeRepository
    {
        public UserTypeRepository(IConfiguration config) : base(config) { }

        public List<UserType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, Name
                            FROM UserType
                        ";
                    var reader = cmd.ExecuteReader();
                    var userType = new List<UserType>();

                    while (reader.Read())
                    {
                        userType.Add(new UserType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();

                    return userType;
                }
            }
        }
    }
}
