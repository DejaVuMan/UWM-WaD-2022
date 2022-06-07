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
}