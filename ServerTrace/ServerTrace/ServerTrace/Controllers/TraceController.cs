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

                if (IdTipoTraccia.HasValue)
                {
                    query = query.Where(x => x.IdTipoTraccia == IdTipoTraccia.Value);
                }
          

                if (startDate.HasValue && startDate.Value.Year != 1900)
                {
                    DateTime utcStartDate = startDate.Value.ToUniversalTime();
                    query = query.Where(x => x.DataOra >= utcStartDate);
                }

                if (endDate.HasValue && endDate.Value.Year != 1900)
                {
                    DateTime utcEndDate = endDate.Value.ToUniversalTime().AddDays(1).AddTicks(-1);
                    query = query.Where(x => x.DataOra <= utcEndDate);
                }

                if (!string.IsNullOrEmpty(descrizione))
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

