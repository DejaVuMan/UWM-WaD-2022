namespace WebApi.Models.Reservations;

using System.ComponentModel.DataAnnotations;

public class NewReservation
{
    [Required]
    public DateTime startWindow { get; set; }

    [Required]
    public int reservationLength { get; set; }

    public int userId { get; set; }

    [Required]
    public int trainerId { get; set; }
}