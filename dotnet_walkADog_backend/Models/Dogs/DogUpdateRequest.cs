namespace WebApi.Models.Dogs;

public class DogUpdateRequest
{
    public int userId {get; set;}
    public string Name { get; set; }
    public string Breed { get; set; }
    public string ObedienceLevel { get; set; }
}