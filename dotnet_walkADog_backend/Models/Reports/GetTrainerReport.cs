namespace WebApi.Models.Reports;

using System.ComponentModel.DataAnnotations;

public class GetTrainerReport
{
    [Required]
    public int userId { get; set; }
    
    [Required]
    public int trainerId { get; set; }
}