using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public class PlatformRepository : BaseRepository, IPlatformRepository
    {
        public PlatformRepository(IConfiguration config) : base(config) { }

        public List<Platform> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, Name
                            FROM [Platform]
                        ";
                    var reader = cmd.ExecuteReader();
                    var platforms = new List<Platform>();

                    while (reader.Read())
                    {
                        platforms.Add(new Platform()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();

                    return platforms;
                }
            }
        }
    }
}
