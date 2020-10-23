using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;

namespace CreativeCommand.Controllers
{
    /*[Authorize]*/
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignRepository _campaignRepo;
        private readonly IAccountRepository _accountRepo;
        private readonly IUserRepository _userRepo;
        public CampaignController(
            ICampaignRepository campaignRepository,
            IAccountRepository accountRepository,
            IUserRepository userRepository)
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
        public IActionResult GetAccount(int id)
        {
            return Ok(_campaignRepo.GetCampaignById(id));
        }

        [HttpPost]
        public IActionResult Post(Campaign campaign)
        {
            _campaignRepo.Add(campaign);
            return CreatedAtAction("Get", new { id = campaign.Id }, campaign);
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
