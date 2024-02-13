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
        }

        [HttpGet("traces")]
        public async Task<IActionResult> GetTraces(int numberOfRows,  DateTime? startDate = null, DateTime? endDate = null, long? IdTipoTraccia = null, string? descrizione = null)
        {
            try
            {
                var query = _context.DEV_TracerDB.AsQueryable().AsNoTracking();

                if (!string.IsNullOrWhiteSpace(IdTipoTraccia.ToString()))
                {
                    query = query.Where(x => x.IdTipoTraccia == IdTipoTraccia);
                }


                if (!string.IsNullOrWhiteSpace(startDate.ToString()))
                {
                    DateTime utcStartDate = DateTime.SpecifyKind(startDate.Value.Date, DateTimeKind.Utc);
                    query = query.Where(x => x.DataOra >= utcStartDate);
                }

                if (!string.IsNullOrWhiteSpace(endDate.ToString()))
                {
                    DateTime utcEndDate = DateTime.SpecifyKind(endDate.Value.Date.AddHours(23).AddMinutes(59).AddSeconds(59), DateTimeKind.Utc);
                    query = query.Where(x => x.DataOra < utcEndDate);  
                }


              if (!string.IsNullOrWhiteSpace(descrizione))
                {
                    query = query.Where(x => x.Descrizione.Contains(descrizione));
                    numberOfRows = int.MaxValue;
                }
                else
                {
                    query = query.Take(numberOfRows);
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

