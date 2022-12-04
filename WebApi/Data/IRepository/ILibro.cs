using WebApi.Models;

namespace WebApi.Data.IRepository
{
    public interface ILibro
    {
        public Task<List<Libro>> ObtenerLibros();
        public Libro RegistrarLibro(Libro libro);
    }
}
