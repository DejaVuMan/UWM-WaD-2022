namespace WebApi.Entities;

using System.Text.Json.Serialization;

public class TrainerData
{
    public int Id { get; set; }
    public int userId { get; set; }
    public float currentRating { get; set; }
    public int ratingCount { get; set; }
}