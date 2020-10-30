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
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignRepository _campaignRepo;
        private readonly IAccountRepository _accountRepo;
        private readonly ICampaignStatusRepository _campaignStatusRepo;
        public CampaignController(
            ICampaignRepository campaignRepository,
            IAccountRepository accountRepository,
            ICampaignStatusRepository campaignStatusRepository)
        {
            _campaignRepo = campaignRepository;
            _accountRepo = accountRepository;
            _campaignStatusRepo = campaignStatusRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_campaignRepo.GetAllCampaigns());
        }

        [HttpGet("{id}")]
        public IActionResult GetCampaign(int id)
        {
            return Ok(_campaignRepo.GetCampaignById(id));
        }

        [HttpPost]
        public IActionResult Post(Campaign campaign)
        {
            campaign.CreateDate = DateTime.Now;
            _campaignRepo.Add(campaign);
            return CreatedAtAction("GetCampaign", new { id = campaign.Id }, campaign);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Campaign campaign)
        {
            if (id != campaign.Id)
            {
                return BadRequest();
            }
            _campaignRepo.Update(campaign);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            CampaignStatus campaignStatus = _campaignStatusRepo.GetByCampaignId(id);
            _campaignStatusRepo.Delete(campaignStatus.Id);
            
            _campaignRepo.Delete(id);
            return NoContent();
        }
    }
}
