using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface IPlatformRepository
    {
        List<Platform> GetAll();
    }
}