using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAllUsers();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserById(int id);
        void Add(UserProfile user);
        void Update(UserProfile user);
        void Delete(int id);
        List<UserProfile> GetAllManagerUsers();
        List<UserProfile> GetAllSalesUsers();
    }
}