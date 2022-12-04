using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Autor
    {
        public int AutorId { get; set; }

        [Required]
        public string NombreCompleto { get; set; } = string.Empty;

        [Required]
        public string FechaNacimiento { get; set; } = string.Empty;

        [Required]
        public string CiudadProcedencia { get; set; } = string.Empty;

        [Required]
        public string? CorreoElectronico { get; set; }

    }
}
