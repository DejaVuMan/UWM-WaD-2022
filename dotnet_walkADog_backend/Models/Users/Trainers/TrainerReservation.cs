namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class TrainerReservations
{
    public int userId { get; set; }
    public DateTime startWindow { get; set; }
    public int reservationLength { get; set; }
    public bool isReserved { get; set; }
}