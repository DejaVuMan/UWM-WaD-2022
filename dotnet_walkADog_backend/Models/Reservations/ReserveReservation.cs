namespace WebApi.Models.Reservations;

using System.ComponentModel.DataAnnotations;

public class ReserveReservation
{
    [Required]
    public int userId { get; set; }
    [Required]
    public int reservationId{ get; set; }
}