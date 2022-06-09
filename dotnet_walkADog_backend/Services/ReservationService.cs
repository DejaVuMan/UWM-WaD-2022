namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Reservations;

public interface IReservationService
{
    public void Create(NewReservation model);
    public IEnumerable<ReservationData> GetReservationsById(int id);

    public void ReserveReservation(ReserveReservation model);
}

public class ReservationService : IReservationService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;

    public ReservationService(
        DataContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
    }

    public void Create(NewReservation model)
    {
        try
        {
            Console.WriteLine(model.startWindow);
            var timeUniqueness = _context.ReservationData.Where(x => x.startWindow == model.startWindow);

            if(timeUniqueness.Any())
            {
                foreach(var elem in timeUniqueness)
                {
                    if(elem.startWindow == model.startWindow)
                        throw new AppException("You already added a reservation window for " + model.startWindow);
                }
            }

            // map model to new dog object
            var resWindow = _mapper.Map<ReservationData>(model);

            // save dog
            _context.ReservationData.Add(resWindow);

            _context.SaveChanges();
            Console.WriteLine("Saved Reservation Window for TrainerId " + model.trainerId + " for date " + model.startWindow);
        } 
        catch(Exception e) 
        {
            Console.WriteLine(e);
        }
    }

    public IEnumerable<ReservationData> GetReservationsById(int id)
    {
        Console.WriteLine("Entered GetReservationsById method = ID: " + id);
        return _context.ReservationData.Where(elem => elem.trainerId == id);
    }

    public void ReserveReservation(ReserveReservation model)
    {
        Console.WriteLine("Entered ReserveReservation method = reservation ID: " + model.reservationId);

        var reservation = getReservation(model.reservationId);
        if(reservation.isReserved)
        {
            throw new AppException("This reservation is already reserved!");
        }
        _mapper.Map(model, reservation);
        _context.ReservationData.Update(reservation);
        _context.SaveChanges();

        Console.WriteLine("Changes saved");
    }

    // Internal funcs

    private ReservationData getReservation(int id)
    {
        var reservation = _context.ReservationData.Find(id);
        if (reservation == null) throw new KeyNotFoundException("Reservation not found");
        return reservation;
    }

}