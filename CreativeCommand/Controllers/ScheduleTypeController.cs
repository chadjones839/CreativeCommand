using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace CreativeCommand.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleTypeController : ControllerBase
    {
        private readonly IScheduleTypeRepository _scheduleTypeRepo;
        public ScheduleTypeController(IScheduleTypeRepository scheduleTypeRepository)
        {
            _scheduleTypeRepo = scheduleTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_scheduleTypeRepo.GetAll());
        }
    }
}