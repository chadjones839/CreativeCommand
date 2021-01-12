using System;
using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace CreativeCommand.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IAccountRepository _accountRepo;
        private readonly IContactsRepository _contactsRepo;
        public ContactsController(
            IAccountRepository accountRepository,
            IContactsRepository contactsRepository)
        {

            _accountRepo = accountRepository;
            _contactsRepo = contactsRepository;

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_contactsRepo.GetAllContacts());
        }

        [HttpGet("contact_account/{id}")]
        public IActionResult GetContact(int id)
        {
            return Ok(_contactsRepo.GetContactByAccountId(id));
        }
    }
}