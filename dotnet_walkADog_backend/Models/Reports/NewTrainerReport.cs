namespace WebApi.Models.Reports;

using System.ComponentModel.DataAnnotations;

public class NewTrainerReport
{
    [Required]
    public int userId { get; set; }

    [Required]
    public int trainerId { get; set; }
    
    [Required]
    public string report { get; set; }
}