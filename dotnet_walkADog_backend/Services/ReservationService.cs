namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Reservations;

public interface IReservationService
{
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
}