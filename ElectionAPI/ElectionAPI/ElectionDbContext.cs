using ElectionAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace ElectionAPI
{
    public class ElectionDbContext: DbContext
    {
        private readonly IConfiguration configuration;

        public ElectionDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Vote> Votes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
            //optionsBuilder.UseSqlServer("Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=ElectionDB;Data Source=DESKTOP-LL4R9A4");
            optionsBuilder.UseSqlServer(configuration["ConnectionString"]);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Candidate>().HasData(new Candidate { 
                CandidateID = 1,
                Name = "Branco"
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}