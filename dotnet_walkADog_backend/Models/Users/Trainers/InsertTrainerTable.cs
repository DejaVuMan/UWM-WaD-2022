namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class InsertTrainerTable
{
    [Required]
    public int userId{ get; set; }
    [Required]
    public float currentRating{ get; set; }
    [Required]
    public int ratingCount { get; set; }
}