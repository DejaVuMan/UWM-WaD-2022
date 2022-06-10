namespace WebApi.Entities;

public class TrainerReport
{
    public int Id { get; set; }
    public int userId { get; set; }
    public int trainerId { get; set; }
    public string report { get; set; }
}