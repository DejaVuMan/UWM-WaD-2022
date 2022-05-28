namespace WebApi.Entities;

public class TrainerData
{
    public int Id { get; set; }
    public int userId { get; set; }
    public float currentRating { get; set; }
    public int ratingCount { get; set; }
}