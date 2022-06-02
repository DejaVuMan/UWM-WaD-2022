namespace WebApi.Entities;

using System.ComponentModel.DataAnnotations;

public class Dog
{
    public int Id { get; set; }
    public int userId {get; set;}
    public string Name { get; set; }
    public string Breed { get; set; }
    public string ObedienceLevel { get; set; }
}