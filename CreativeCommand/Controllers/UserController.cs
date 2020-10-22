using System;
using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;
using Microsoft.AspNetCore.Authorization;

namespace CreativeCommand.Controllers
{
    /*[Authorize]*/
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IUserTypeRepository _userTypeRepo;
        public UserController(IUserRepository userRepository, IUserTypeRepository userTypeRepository)
        {
            _userRepo = userRepository;
            _userTypeRepo = userTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepo.GetAllUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            return Ok(_userRepo.GetUserById(id));
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepo.Add(user);
            return CreatedAtAction(
                nameof(GetUser),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _userRepo.Update(user);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _userRepo.Delete(id);
            return NoContent();
        }
    }
}
