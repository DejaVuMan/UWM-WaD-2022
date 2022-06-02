namespace WebApi.Services;

using AutoMapper;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Dogs;

public interface IDogService
{
    void Register(RegisterDog model);
}

public class DogService : IDogService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;

    public DogService(
        DataContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
    }


    public void Register(RegisterDog model)
    {
        Console.WriteLine("Entered Register for Dog");
        // map model to new dog object
        var dog = _mapper.Map<Dog>(model);
        Console.WriteLine("Mapped Dog");

        // save dog
        _context.Dogs.Add(dog);
        Console.WriteLine("Added Dog");

        _context.SaveChanges();
        Console.WriteLine("Saved Dog");
    }
}