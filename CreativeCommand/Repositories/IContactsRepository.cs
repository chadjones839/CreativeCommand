using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface IContactsRepository
    {
        List<Contact> GetAllContacts();
        Contact GetContactByAccountId(int id);
    }
}