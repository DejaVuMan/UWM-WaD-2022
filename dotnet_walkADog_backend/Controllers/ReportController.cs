namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Models.Reports;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ReportController : ControllerBase
{
    private IReportService _reportService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;

    public ReportController(
        IReportService reportService,
        IMapper mapper,
        IOptions<AppSettings> appSettings)
    {
        _reportService = reportService;
        _mapper = mapper;
        _appSettings = appSettings.Value;
    }

    // POST http://localhost:4000/report/create
    [HttpPost("create")]
    public IActionResult Create(NewReservation model)
    {
        _reportService.Create(model);
        return Ok(new { message = "Reservation successfully added" });
    }
}