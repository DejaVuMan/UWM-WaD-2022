namespace WebApi.Services;

using AutoMapper;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Reports;

public interface IReportService
{
    void Create(NewTrainerReport model);
    public IEnumerable<TrainerReport> Get(GetTrainerReport model);
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

    public void Create(NewTrainerReport model)
    {
        Console.WriteLine("Entered Create for NTR");
        // map model to new user object
        var report = _mapper.Map<TrainerReport>(model);

        // save report
        _context.TrainerReport.Add(report);

        _context.SaveChanges();
        Console.WriteLine("Created Trainer Report in db");
    }

    public IEnumerable<TrainerReport> Get(GetTrainerReport model)
    {
        Console.WriteLine("Entered Create for GTR");
        var trainerReport = _context.TrainerReport.Where(e => e.trainerId == model.trainerId);
        if(trainerReport == null)
        {
            Console.WriteLine("Reports not found.");
            throw new AppException("Reports couldnt be found!");
        }

        return trainerReport;
    }

}