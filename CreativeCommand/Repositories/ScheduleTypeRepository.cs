using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public class ScheduleTypeRepository : BaseRepository, IScheduleTypeRepository
    {
        public ScheduleTypeRepository(IConfiguration config) : base(config) { }

        public List<ScheduleType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, Name
                            FROM ScheduleType
                        ";
                    var reader = cmd.ExecuteReader();
                    var scheduleType = new List<ScheduleType>();

                    while (reader.Read())
                    {
                        scheduleType.Add(new ScheduleType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();

                    return scheduleType;
                }
            }
        }
    }
}
