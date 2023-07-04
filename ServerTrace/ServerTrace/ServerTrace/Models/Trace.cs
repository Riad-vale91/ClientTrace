using System;
using System.ComponentModel.DataAnnotations;
namespace ServerTrace.Models
{
    public class DEV_TracerDB
    {

        [Key]
        public long Id { get; set; }
        public DateTime DataOra { get; set; }
        public string? Societa { get; set; }
        public string? Agenzia { get; set; }
        public string? NomeApplicazione { get; set; }
        public string? Utente { get; set; }
        public string? Pagina { get; set; }
        public string? Descrizione { get; set; }

        public long? IdTipoTraccia { get; set; }
        public long IdTracerCategories { get; set; }
    }
}
