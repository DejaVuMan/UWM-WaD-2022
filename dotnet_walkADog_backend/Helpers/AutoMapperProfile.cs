namespace WebApi.Helpers;

using AutoMapper;
using WebApi.Entities;
using WebApi.Models.Users;
using WebApi.Models.Dogs;
using WebApi.Models.Reservations;
using WebApi.Models.Reports;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // User -> AuthenticateResponse
        CreateMap<User, AuthenticateResponse>();

        // RegisterRequest -> User
        CreateMap<RegisterRequest, User>();

        // RegisterDog -> Dog
        CreateMap<RegisterDog, Dog>();

        // UpdateRequest -> User
        CreateMap<UpdateRequest, User>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));

        // DogUpdateRequest -> Dog
        CreateMap<DogUpdateRequest, Dog>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));

        //InsertTrainerTable -> TrainerData
        CreateMap<InsertTrainerTable, TrainerData>();

        //UpdateTrainerTable, TrainerData
        CreateMap<UpdateTrainerTable, TrainerData>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));


        // NewReservation -> ReservationData
        CreateMap<NewReservation, ReservationData>();

        //ReserveReservation -> ReservationData
        CreateMap<ReserveReservation, ReservationData>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));

        // NewTrainerReport -> TrainerReport
        CreateMap<NewTrainerReport, TrainerReport>();
    }
}