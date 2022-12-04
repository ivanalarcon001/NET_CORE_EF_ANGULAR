using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data.Repository;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorController : ControllerBase
    {
        private AutorRepository autorRepository;

        public AutorController(AplicationDbContext context)
        {
            autorRepository = new AutorRepository(context);
        }

        /// <summary>
        /// Consulta todos los autores
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var autores = await autorRepository.ObtenerAutores();
                return Ok(autores);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Registra un autor
        /// </summary>
        /// <param name="autor"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Autor autor)
        {
            try
            {
                var escritor = autorRepository.RegistrarAutor(autor);
                return Ok(escritor);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
