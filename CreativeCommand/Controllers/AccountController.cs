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
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepo;
        private readonly ICampaignRepository _campaignRepo;
        private readonly ICampaignStatusRepository _campaignStatusRepo;
        public AccountController(
            IAccountRepository accountRepository,  
            ICampaignRepository campaignRepository,
            ICampaignStatusRepository campaignStatusRepository)
        {

            _accountRepo = accountRepository;
            _campaignRepo = campaignRepository;
            _campaignStatusRepo = campaignStatusRepository;
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
            account.DateCreated = DateTime.Now;
            _accountRepo.Add(account);
            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
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
            List<CampaignStatus> campaignStatuses = _campaignStatusRepo.GetAllByCampaignAccountId(id);
            foreach (var item in campaignStatuses)
            {
                _campaignStatusRepo.Delete(item.Id);
            }
            List<Campaign> campaigns = _campaignRepo.GetAllCampaignsByAccountId(id);
            foreach (var item in campaigns)
            {
                _campaignRepo.Delete(item.Id);
            }

            _accountRepo.Delete(id);
            return NoContent();
        }
    }
}