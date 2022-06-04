namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Models.Dogs;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("[controller]")]

public class DogsController : ControllerBase
{
    private IDogService _dogService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;

    public DogsController(
        IDogService dogService,
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _dogService = dogService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

    // POST http://localhost:4000/dogs/register
    [HttpPost("register")]
    public IActionResult Register(RegisterDog model)
    {
        try
        {
            _dogService.Register(model);
            return Ok(new { message = "Registration successful" });
        } 
        catch(Exception e)
        {
            Console.WriteLine(e);
            return Ok(new { message = "User tried to add a dog with an already existing name"});
        }
    }

    // GET http://localhost:4000/dogs
    [HttpPost] // ("{id}")
    public IActionResult GetDogs(RequestDogs model)
    {
        try{
            Console.WriteLine("Entered GetDogs call");
            var dogs = _dogService.GetDogs(model.userId);//_userService.GetAll();
            Console.WriteLine(dogs.FirstOrDefault());
            return Ok(dogs);
        } 
        catch(Exception e)
        {
            Console.WriteLine(e);
            return Ok(new { message = "An error ocurred"});
        }
    }

    // GET http://localhost:4000/dogs/{id}
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        Console.WriteLine("Entered IAction GetID");
        var dog = _dogService.GetById(id);
        Console.WriteLine(dog.Id);
        return Ok(dog);
    }

    // PUT http://localhost:4000/dogs/{id}
    [HttpPut("{id}")]
    public IActionResult Update(int id, DogUpdateRequest model)
    {
        _dogService.Update(id, model);
        return Ok(new { message = "Dog updated successfully" });
    }

    // DELETE http://localhost:4000/dogs/{id}
    [HttpDelete("{id}")]
    public IActionResult DropById(int id)
    {
        _dogService.DropById(id);
        return Ok(new { message = "Dog removed successfully" });
    }
}