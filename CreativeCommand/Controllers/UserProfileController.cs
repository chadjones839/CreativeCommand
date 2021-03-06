﻿using System;
using Microsoft.AspNetCore.Mvc;
using CreativeCommand.Repositories;
using CreativeCommand.Models;
using Microsoft.AspNetCore.Authorization;

namespace CreativeCommand.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userRepo;
        private readonly IUserTypeRepository _userTypeRepo;
        public UserProfileController(IUserProfileRepository userRepository, IUserTypeRepository userTypeRepository)
        {
            _userRepo = userRepository;
            _userTypeRepo = userTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepo.GetAllUsers());
        }

        [HttpGet("sales")]
        public IActionResult GetAllSalesUsers()
        {
            return Ok(_userRepo.GetAllSalesUsers());
        }

        [HttpGet("manager")]
        public IActionResult GetAllManagerUsers()
        {
            return Ok(_userRepo.GetAllManagerUsers());
        }

        [HttpGet("id/{id}")]
        public IActionResult GetUser(int id)
        {
            return Ok(_userRepo.GetUserById(id));
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userRepo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile user)
        {
            _userRepo.Add(user);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = user.FirebaseUserId },
                user);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, UserProfile user)
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
