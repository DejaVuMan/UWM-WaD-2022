namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class UpdateTrainerTable
{
    [Required]
    public int userId{ get; set; }
    [Required]
    public float currentRating{ get; set; }
}