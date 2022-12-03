using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Autor
    {
        public int AutorId { get; set; }

        [Required]
        public string NombreCompleto { get; set; } = string.Empty;

        [Required]
        public DateTime FechaNacimiento { get; set; }

        [Required]
        public string CiudadProcedencia { get; set; } = string.Empty;

        [Required]
        public string? CorreoElectronico { get; set; }

    }
}
