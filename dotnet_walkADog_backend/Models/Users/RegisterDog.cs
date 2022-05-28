namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class RegisterDog
{
    [Required]
    public int userId {get; set;}
    [Required]
    public string Name { get; set; }
    [Required]
    public string Breed { get; set; }
    [Required]
    public string ObedienceLevel { get; set; }
}