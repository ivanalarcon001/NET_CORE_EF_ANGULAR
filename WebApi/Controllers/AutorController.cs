﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public AutorController(AplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Consulta todos los autores
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> ObtenerAutores()
        {
            try
            {
                var autores = await _context.Autor.ToListAsync();
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
        public async Task<IActionResult> RegistrarAutor([FromBody] Autor autor)
        {
            try
            {
                _context.Add(autor);
                await _context.SaveChangesAsync();
                return Ok(autor);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
