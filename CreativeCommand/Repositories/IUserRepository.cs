using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        User GetUserById(int id);
        void Add(User user);
        void Update(User user);
        void Delete(int id);
    }
}