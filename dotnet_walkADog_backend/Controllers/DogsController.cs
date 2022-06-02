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
}