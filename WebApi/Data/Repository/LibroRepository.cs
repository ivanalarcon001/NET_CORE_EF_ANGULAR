using Microsoft.EntityFrameworkCore;
using WebApi.Data.IRepository;
using WebApi.Models;

namespace WebApi.Data.Repository
{
    public class LibroRepository : ILibro
    {
        private readonly AplicationDbContext _context;

        public LibroRepository(AplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Libro>> ObtenerLibros()
        {
            var libros = _context.Libro.ToListAsync();
            return libros;
        }

        public Libro RegistrarLibro(Libro libro)
        {
            _context.Add(libro);
            _context.SaveChanges();
            return libro;
        }
    }
}
