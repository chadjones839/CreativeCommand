using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface IScheduleTypeRepository
    {
        List<ScheduleType> GetAll();
    }
}