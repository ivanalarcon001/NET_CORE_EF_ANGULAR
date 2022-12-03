using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public LibroController(AplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Consulta todos los libros
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> ObtenerLibros()
        {
            try
            {
                var libros = await _context.Libro.ToListAsync();
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
        public async Task<IActionResult> RegistrarLibro([FromBody] Libro libro)
        {
            try
            {
                _context.Add(libro);
                await _context.SaveChangesAsync();
                return Ok(libro);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
