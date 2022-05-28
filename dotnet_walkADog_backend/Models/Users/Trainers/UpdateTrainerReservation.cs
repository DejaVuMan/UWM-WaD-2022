namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class UpdateTrainerReservations
{
    public DateTime startWindow { get; set; }
    public int reservationLength { get; set; }
    public bool isReserved { get; set; }
}