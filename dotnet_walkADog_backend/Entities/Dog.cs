namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class Dog
{
    public int id { get; set; }
    public int userId {get; set;}
    public string Name { get; set; }
    public string Breed { get; set; }
    public string ObedienceLevel { get; set; }
}