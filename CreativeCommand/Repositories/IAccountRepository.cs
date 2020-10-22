using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface IAccountRepository
    {
        List<Account> GetAllAccounts();
        Account GetAccountById(int id);
        void Add(Account account);
        void Delete(int id);
        void Update(Account account);
    }
}