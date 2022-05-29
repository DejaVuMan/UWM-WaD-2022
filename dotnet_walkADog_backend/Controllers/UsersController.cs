﻿namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Models.Users;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;

    public UsersController(
        IUserService userService,
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _userService = userService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

    // POST http://localhost:4000/users/authenticate
    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);
        return Ok(response);
    }

    // POST http://localhost:4000/users/register
    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register(RegisterRequest model)
    {
        _userService.Register(model);
        return Ok(new { message = "Registration successful" });
    }

    // GET http://localhost:4000/users
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();//_userService.GetAll();
        return Ok(users);
    }

    // GET http://localhost:4000/users/trainers
    [HttpGet("trainers")]
    public IActionResult GetAllTrainers()
    {
        var trainers = _userService.GetAllTrainers();
        return Ok(trainers);
    }

    // GET http://localhost:4000/users/trainersdata
    [HttpGet("trainersdata")]
    public IActionResult GetAllTrainerData()
    {
        var trainersdata = _userService.GetAllTrainerData();
        return Ok(trainersdata);
    }

    // GET http://localhost:4000/users/trainersdata
    [HttpGet("trainersdata/{id}")]
    public IActionResult GetTrainerDataById(int id)
    {
        var trainersdata = _userService.GetTrainerDataById(id);
        return Ok(trainersdata);
    }

    // 
    // [HttpGet("trainers/{id}")]
    // public IActionResult GetByTrainerId(int id)
    // {
    //     var trainer = _userService.GetById(id);
    //     return Ok(trainer);
    // }
    // Unnecessary, we can call on userService since front-end dictates correct ID anyway

    // GET http://localhost:4000/users/{id}
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _userService.GetById(id);
        return Ok(user);
    }

    // PUT http://localhost:4000/users/{id}
    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateRequest model)
    {
        _userService.Update(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    // DELETE http://localhost:4000/user/id
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userService.Delete(id);
        return Ok(new { message = "User deleted successfully" });
    }
}