using System;
using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;
using Microsoft.AspNetCore.Authorization;

namespace CreativeCommand.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignRepository _campaignRepo;
        private readonly IAccountRepository _accountRepo;
        private readonly IUserProfileRepository _userRepo;
        public CampaignController(
            ICampaignRepository campaignRepository,
            IAccountRepository accountRepository,
            IUserProfileRepository userRepository)
        {
            _campaignRepo = campaignRepository;
            _accountRepo = accountRepository;
            _userRepo = userRepository;
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
            _campaignRepo.Delete(id);
            return NoContent();
        }
    }
}
