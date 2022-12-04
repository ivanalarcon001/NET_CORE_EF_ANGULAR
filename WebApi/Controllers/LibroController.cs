using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data.Repository;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private LibroRepository libroRepository;

        public LibroController(AplicationDbContext context)
        {
            libroRepository = new LibroRepository(context);
        }

        /// <summary>
        /// Consulta todos los libros
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var libros = await libroRepository.ObtenerLibros();
                return Ok(libros);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Registrar un libro
        /// </summary>
        /// <param name="libro"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Libro libro)
        {
            try
            {
                var escritor = libroRepository.RegistrarLibro(libro);
                return Ok(escritor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
