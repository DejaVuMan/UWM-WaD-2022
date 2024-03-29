namespace WebApi.Helpers;

using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server database
        options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
    }

    public DbSet<User> Users { get; set; }
    public DbSet<TrainerData> TrainerData { get; set; }
    public DbSet<TrainerReport> TrainerReport { get; set; }
    public DbSet<Dog> Dogs { get; set; }
    public DbSet<ReservationData> ReservationData { get; set; }
}