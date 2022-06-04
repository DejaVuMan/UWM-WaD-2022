namespace WebApi.Models.Dogs;

using System.ComponentModel.DataAnnotations;

public class RequestDogs
{
    [Required]
    public int userId {get; set;}
}