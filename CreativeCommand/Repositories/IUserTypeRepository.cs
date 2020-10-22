using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface IUserTypeRepository
    {
        List<UserType> GetAll();
    }
}