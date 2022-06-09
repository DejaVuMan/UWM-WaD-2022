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

    IEnumerable<User> GetAllUsers();

    IEnumerable<TrainerData> GetAllTrainerData();
    IEnumerable<User> GetAllTrainers();

    TrainerData GetTrainerDataById(int id);

    TrainerData OpenGetTrainerDataById(int id);

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

    public IEnumerable<User> GetAllUsers()
    {
        Console.WriteLine("Entered GetAllUsers method");
        return _context.Users.Where(elem => elem.IsTrainer == false);
        // return only users which selected trainer during options
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

    public TrainerData OpenGetTrainerDataById(int id) // open ended call not necessitate data
    {
     return getDataOpenEnded(id);   
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
        Console.WriteLine();
        Console.WriteLine("Updating user data.");
        var user = getUser(id);

        // validate
        if (model.Username != user.Username && _context.Users.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken");

        // hash password if it was entered
        if (!string.IsNullOrEmpty(model.Password))
            user.PasswordHash = BCrypt.HashPassword(model.Password);

        // if user.IsTrainer -> GetTrainerDataById(id)
        if(user.IsTrainer)
        {
            Console.WriteLine("User to update is also a trainer.");
        }

        // copy model to user and save
        _mapper.Map(model, user);
        _context.Users.Update(user);
        _context.SaveChanges();
        Console.WriteLine("Changes Added!");
    }

    public void UpdateTrainerTable(UpdateTrainerTable model)
    {
        Console.WriteLine("Updating Trainer with new rating: " + model.currentRating);
        var trainerData = getTrainerData(model.userId);
        if(trainerData.ratingCount < 1)
        {
            Console.WriteLine(trainerData.currentRating);
            trainerData.currentRating = (float) model.currentRating; // add rating
            Console.WriteLine(trainerData.currentRating);
        }
        else
        {
            trainerData.currentRating = (trainerData.currentRating + model.currentRating) / 2;
        }
        trainerData.ratingCount += 1;
         _context.TrainerData.Update(trainerData);
         _context.SaveChanges();
        Console.WriteLine("Changes Added!");
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

    private User getUser(int id) // why is this entered for DogRegister call?
    {
        Console.WriteLine("entered method for user retrieval");
        var user = _context.Users.Find(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        Console.WriteLine("no exceptions thrown");
        return user;
    }

    private TrainerData getDataOpenEnded(int id) // similar to getTrainerData but doesnt necessitate response
    {
        var dbId = _context.TrainerData.Where(elem => elem.userId == id);
        var trainerData = dbId.FirstOrDefault(); // ensure exception isnt thrown
        return trainerData;
    }

    private TrainerData getTrainerData(int id)
    {
        Console.WriteLine("Entered TrainerData");
        var dbId = _context.TrainerData.Where(elem => elem.userId == id);
        var trainerData = dbId.FirstOrDefault(); // ensure if it doesnt exist, we dont throw exception in setting trainerData
        if(trainerData == null) throw new KeyNotFoundException("Trainer data not found");
        Console.WriteLine("no exceptions thrown");
        return trainerData;
    }
}