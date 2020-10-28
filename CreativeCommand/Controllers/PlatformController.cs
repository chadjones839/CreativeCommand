using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace CreativeCommand.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlatformController : ControllerBase
    {
        private readonly IPlatformRepository _platformRepo;
        public PlatformController(IPlatformRepository platformRepository)
        {
            _platformRepo = platformRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_platformRepo.GetAll());
        }
    }
}