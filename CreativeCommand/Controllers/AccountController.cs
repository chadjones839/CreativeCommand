using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;

namespace CreativeCommand.Controllers
{
    /*[Authorize]*/
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepo;
        private readonly IUserRepository _userRepo;
        private readonly IUserTypeRepository _userTypeRepo;
        public AccountController(
            IAccountRepository accountRepository, 
            IUserRepository userRepository, 
            IUserTypeRepository userTypeRepository)
        {
            _accountRepo = accountRepository;
            _userRepo = userRepository;
            _userTypeRepo = userTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_accountRepo.GetAllAccounts());
        }

        [HttpGet("{id}")]
        public IActionResult GetAccount(int id)
        {
            return Ok(_accountRepo.GetAccountById(id));
        }

        [HttpPost]
        public IActionResult Post(Account account)
        {
            _accountRepo.Add(account);
            return CreatedAtAction("Get", new { id = account.Id }, account);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }
            _accountRepo.Update(account);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _accountRepo.Delete(id);
            return NoContent();
        }
    }
}