using System.ComponentModel.DataAnnotations;

namespace ServerTrace.Models
{
    public class DEV_TipoTraccia
    {
        [Key]
        public long Id { get; set; }
        public string? Descrizione { get; set; }
    }
}
