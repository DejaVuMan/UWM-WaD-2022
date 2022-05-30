namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User GetById(int id);
    void Register(RegisterRequest model);
    void Update(int id, UpdateRequest model);
    void Delete(int id);

    IEnumerable<TrainerData> GetAllTrainerData();
    IEnumerable<User> GetAllTrainers();

    TrainerData GetTrainerDataById(int id);

    //void InsertTrainerTable(int id);
}

public class UserService : IUserService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;

    public UserService(
        DataContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
    }

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

        // validate
        if (user == null || !BCrypt.Verify(model.Password, user.PasswordHash))
            throw new AppException("Username or password is incorrect");

        // authentication successful
        var response = _mapper.Map<AuthenticateResponse>(user);
        response.Token = _jwtUtils.GenerateToken(user);
        if(user.IsTrainer){
            response.IsTrainer = true;
        }
        else
        {
            response.IsTrainer = false;
        }
        Console.WriteLine(response.Username);
        Console.WriteLine(response.IsTrainer);
        return response;
    }

    public IEnumerable<User> GetAll()
    {
        return _context.Users;
    }

    public IEnumerable<User> GetAllTrainers() // call this one first when displaying trainers
    {
        Console.WriteLine("Entered GetAllTrainers method");
        return _context.Users.Where(elem => elem.IsTrainer == true);
        // return only users which selected trainer during options
    }

    public IEnumerable<TrainerData> GetAllTrainerData() // then call this one
    {
        Console.WriteLine("Entered GetAllTrainersData method");
        return _context.TrainerData;
    }

    public TrainerData GetTrainerDataById(int id)
    {
        return getTrainerData(id);
    }

    public User GetById(int id)
    {
        return getUser(id);
    }

    public void Register(RegisterRequest model)
    {
        // validate
        if (_context.Users.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken");

        // map model to new user object
        var user = _mapper.Map<User>(model);

        // hash password
        user.PasswordHash = BCrypt.HashPassword(model.Password);

        // save user
        _context.Users.Add(user);

        _context.SaveChanges();

        if(user.IsTrainer)
        {
            Console.WriteLine("User attempting to register is a Trainer.");
            InsertTrainerTable testModel = new InsertTrainerTable();
            Console.WriteLine("Created empty InsertTrainerTable model.");
            testModel.userId = user.Id;
            testModel.currentRating = 0;
            testModel.ratingCount = 0;
            Console.WriteLine("Values set.");
            InsertTrainerTable(testModel);
        }
        _context.SaveChanges();
    }

    public void Update(int id, UpdateRequest model)
    {
        var user = getUser(id);

        // validate
        if (model.Username != user.Username && _context.Users.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken");

        // hash password if it was entered
        if (!string.IsNullOrEmpty(model.Password))
            user.PasswordHash = BCrypt.HashPassword(model.Password);

        // copy model to user and save
        _mapper.Map(model, user);
        _context.Users.Update(user);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var user = getUser(id);
        _context.Users.Remove(user);
        _context.SaveChanges();
    }

    public void InsertTrainerTable(InsertTrainerTable model)
    {
        Console.WriteLine("Entered method for calls");
        try{
            var trainer = _mapper.Map<TrainerData>(model);
            Console.WriteLine("mapped elements.");
            var trainerData = 
            _context.TrainerData.Add(trainer);
            _context.SaveChanges();
        Console.WriteLine("Trainer data table saved!");
        } catch (Exception e){
            Console.WriteLine("Exception occurred! " + e);
        }
    }

    //helper methods

    private User getUser(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }

    private TrainerData getTrainerData(int id)
    {
        var dbId = _context.TrainerData.Where(elem => elem.userId == id);
        var trainerData = dbId.FirstOrDefault();
        if(trainerData == null) throw new KeyNotFoundException("Trainer data not found");
        return trainerData;
    }
}