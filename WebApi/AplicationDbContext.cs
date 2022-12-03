using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }

        public virtual DbSet<Autor> Autor { get; set; } = null!;
        public virtual DbSet<Libro> Libro { get; set; } = null!;
    }
}
