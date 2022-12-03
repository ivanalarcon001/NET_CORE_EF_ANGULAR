using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Libro
    {
        public int LibroId { get; set; }

        [Required]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        public string Anio { get; set; } = string.Empty;

        [Required]
        public string Genero { get; set; } = string.Empty;

        [Required]
        public int NumeroPaginas { get; set; }

        [Required]
        public int AutorId { get; set; }
    }
}
