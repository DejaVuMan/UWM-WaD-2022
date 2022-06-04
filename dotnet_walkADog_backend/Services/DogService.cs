namespace WebApi.Services;

using AutoMapper;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Dogs;

public interface IDogService
{
    void Register(RegisterDog model);

    IEnumerable<Dog> GetDogs(int id);

    void Update(int id, DogUpdateRequest model);

    public Dog GetById(int id);
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
        var nameUniqueness = _context.Dogs.Where(x => x.userId == model.userId);

        if(nameUniqueness.Any())
        {
            foreach(var elem in nameUniqueness)
            {
                if(elem.Name == model.Name)
                    throw new AppException("You already added a dog named " + model.Name);
            }
        }

        // map model to new dog object
        var dog = _mapper.Map<Dog>(model);

        // save dog
        _context.Dogs.Add(dog);

        _context.SaveChanges();
        Console.WriteLine("Saved Dog");
    }

    public IEnumerable<Dog> GetDogs(int id)
    {
        Console.WriteLine("ID: " + id);
        // return all dogs in IEnumerable where userId matches passed id
        return _context.Dogs.Where(x => x.userId == id);
    }

    public void Update(int id, DogUpdateRequest model)
    {
        Console.WriteLine(model.userId);
        Console.WriteLine("Updating dog data.");
        var dog = getDog(id);

        try {
        // validate
        var nameUniqueness = _context.Dogs.Where(x => x.userId == model.userId);
        if (model.Name != dog.Name)
        {
            if(nameUniqueness.Any())
            {
                foreach(var elem in nameUniqueness)
                {
                    if(elem.Name == model.Name)
                        throw new AppException("You already added a dog named " + model.Name);
                }
            }
        }

        // copy model to user and save
        _mapper.Map(model, dog);
        _context.Dogs.Update(dog);
        _context.SaveChanges();
        Console.WriteLine("Dog changes Added!");

        } 
        catch(Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public Dog GetById(int id)
    {
        return getDog(id);
    }

        //helper methods

    private Dog getDog(int id) // why is this entered for DogRegister call?
    {
        Console.WriteLine("entered method for dog retrieval");
        var dog = _context.Dogs.Find(id);
        if (dog == null) throw new KeyNotFoundException("Dog not found");
        return dog;
    }
}