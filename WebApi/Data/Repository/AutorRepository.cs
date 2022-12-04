using Microsoft.EntityFrameworkCore;
using WebApi.Data.IRepository;
using WebApi.Models;

namespace WebApi.Data.Repository
{
    public class AutorRepository : IAutor
    {
        private readonly AplicationDbContext _context;

        public AutorRepository(AplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Autor>> ObtenerAutores()
        {
            var autores =  _context.Autor.ToListAsync();
            return autores;
        }

        public Autor RegistrarAutor(Autor autor)
        {
            _context.Add(autor);
            _context.SaveChanges();
            return autor;
        }
    }
}
