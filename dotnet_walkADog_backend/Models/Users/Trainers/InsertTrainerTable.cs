namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class InsertTrainerTable
{
    [Required]
    public int userId{ get; set; }
    public float currentRating{ get; set; }
    public int ratingCount { get; set; }
}