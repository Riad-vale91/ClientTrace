using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerTrace.Models;
using ServerTrace.Service;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ServerTrace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TraceController : ControllerBase
    {
        private readonly DEVLOGDbContext _context;
        public TraceController(DEVLOGDbContext context)
        {
            _context = context;
            _context.Database.SetCommandTimeout(3000);
        }

        [HttpGet("traces")]
        public async Task<IActionResult> GetTraces
            (
                int numberOfRows,
                int? IdTipoTraccia,
                DateTime? startDate = null,
                DateTime? endDate = null,
                string? descrizione = null,
                string? sop = "",
                string? cit = "",
                string? co2 = "",
                string? gia = ""
            )
        {
            try
           {
                var query = _context.DEV_TracerDB.AsQueryable().AsNoTracking();

                if (IdTipoTraccia != -1)
                {
                    query = query.Where(x => x.IdTipoTraccia == IdTipoTraccia);
                }

                if (!string.IsNullOrWhiteSpace(startDate.ToString()))
                {
                    DateTime utcStartDate = DateTime.SpecifyKind(startDate.Value.Date, DateTimeKind.Utc);
                    query = query.Where(x => x.DataOra >= startDate);
                }

                if (!string.IsNullOrWhiteSpace(endDate.ToString()))
                {
                    DateTime utcEndDate = DateTime.SpecifyKind(endDate.Value.Date.AddHours(23).AddMinutes(59).AddSeconds(59), DateTimeKind.Utc);
                    query = query.Where(x => x.DataOra < utcEndDate);
                }

                if (!string.IsNullOrWhiteSpace(descrizione))
                {
                    query = query.Where(x => x.Descrizione.Contains(descrizione));
                }
                //lambda expression Or with multiple conditions

                if(!string.IsNullOrWhiteSpace(sop) || !string.IsNullOrWhiteSpace(cit) || !string.IsNullOrWhiteSpace(co2) || !string.IsNullOrWhiteSpace(gia) )
                {
                    query = query.Where(x => x.Societa!.Equals(sop) || x.Societa.Equals(cit) || x.Societa.Equals(co2) || x.Societa.Equals(gia));
                }   

                var traces = await query.OrderByDescending(x => x.DataOra).Take(numberOfRows).ToListAsync();

                return Ok(traces);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }
    }

}

