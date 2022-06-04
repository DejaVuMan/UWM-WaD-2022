namespace WebApi.Models.Dogs;

public class DogUpdateRequest
{
    public string Name { get; set; }
    public string ObedienceLevel { get; set; }

    public int UserId { get; set; }
}