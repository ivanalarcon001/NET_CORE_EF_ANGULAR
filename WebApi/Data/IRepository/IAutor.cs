using WebApi.Models;

namespace WebApi.Data.IRepository
{
    public interface IAutor
    {
        public Task<List<Autor>> ObtenerAutores();
        public Autor RegistrarAutor(Autor autor);

    }
}
