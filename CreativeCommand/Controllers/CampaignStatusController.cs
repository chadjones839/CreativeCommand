using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;

namespace CreativeCommand.Controllers
{
    /*[Authorize]*/
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

        [HttpGet("{id}")]
        public IActionResult GetAccount(int id)
        {
            return Ok(_campaignStatusRepo.GetCampaignStatusById(id));
        }

        [HttpPost]
        public IActionResult Post(CampaignStatus campaignStatus)
        {
            _campaignStatusRepo.Add(campaignStatus);
            return CreatedAtAction("Get", new { id = campaignStatus.Id }, campaignStatus);
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
