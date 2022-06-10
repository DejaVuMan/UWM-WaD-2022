namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Reports;

public interface IReportService
{
    void Create(NewReservation model);
}

public class ReportService : IReportService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;

    public ReportService(
        DataContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
    }

    void Create(NewTrainerReport model)
    {
        // map model to new user object
        var report = _mapper.Map<TrainerReport>(model);

        // save report
        _context.TrainerReport.Add(report);

        _context.SaveChanges();
    }

}