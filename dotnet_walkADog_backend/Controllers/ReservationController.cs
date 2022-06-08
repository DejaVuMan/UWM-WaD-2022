namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Models.Reservations;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ReservationController : ControllerBase
{
    private IReservationService _reservationService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;

    public ReservationController(
        IReservationService reservationService,
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _reservationService = reservationService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

    // POST http://localhost:4000/reservation/create
    [AllowAnonymous]
    [HttpPost("create")]
    public IActionResult Create(NewReservation model)
    {
        _reservationService.Create(model);
        return Ok(new { message = "Reservation successfully added" });
    }

}