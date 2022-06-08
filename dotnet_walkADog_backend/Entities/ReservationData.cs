namespace WebApi.Entities;

using System.Text.Json.Serialization;

public class ReservationData
{
    public int Id { get; set; }
    public DateTime startWindow { get; set; }
    public int reservationLength { get; set; }
    public bool isReserved { get; set; }
    public int userId { get; set; }
    public int trainerId { get; set; }
}