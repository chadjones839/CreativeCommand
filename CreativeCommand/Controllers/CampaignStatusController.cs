using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;
using Microsoft.AspNetCore.Authorization;

namespace CreativeCommand.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignStatusController : ControllerBase
    {
        private readonly ICampaignStatusRepository _campaignStatusRepo;
        private readonly ICampaignRepository _campaignRepo;
        private readonly IAccountRepository _accountRepo;
        private readonly IUserProfileRepository _userRepo;
        public CampaignStatusController(
            ICampaignStatusRepository campaignStatusRepository,
            ICampaignRepository campaignRepository,
            IAccountRepository accountRepository,
            IUserProfileRepository userRepository)
        {
            _campaignStatusRepo = campaignStatusRepository;
            _campaignRepo = campaignRepository;
            _accountRepo = accountRepository;
            _userRepo = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_campaignStatusRepo.GetAllCampaignStatuses());
        }

        
        [HttpGet("campaignid/{campaignId}")]
        public IActionResult GetAllByCampaignId(int campaignId)
        {
            return Ok(_campaignStatusRepo.GetAllByCampaignId(campaignId));
        }

        [HttpGet("accountid/{accountId}")]
        public IActionResult GetAllByCampaignAccountId(int accountId)
        {
            return Ok(_campaignStatusRepo.GetAllByCampaignAccountId(accountId));
        }

        [HttpGet("{id}")]
        public IActionResult GetCampaignStatus(int id)
        {
            return Ok(_campaignStatusRepo.GetCampaignStatusById(id));
        }

        [HttpGet("campaigntracker/{campaignId}")]
        public IActionResult GetByCampaignId(int campaignId)
        {
            return Ok(_campaignStatusRepo.GetByCampaignId(campaignId));
        }

        [HttpPost]
        public IActionResult Post(CampaignStatus campaignStatus)
        {
            _campaignStatusRepo.Add(campaignStatus);
            return CreatedAtAction("GetCampaignStatus", new { id = campaignStatus.Id }, campaignStatus);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, CampaignStatus campaignStatus)
        {
            if (id != campaignStatus.Id)
            {
                return BadRequest();
            }
            _campaignStatusRepo.Update(campaignStatus);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _campaignStatusRepo.Delete(id);
            return NoContent();
        }
    }
}
