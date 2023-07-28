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
        public async Task<IActionResult> GetTraces(int numberOfRows, DateTime? startDate = null, DateTime? endDate = null, long? IdTipoTraccia = null)
        {
            try
            {
                var query = _context.DEV_TracerDB.AsQueryable();

                if (IdTipoTraccia.HasValue)
                {
                    query = query.Where(x => x.IdTipoTraccia == IdTipoTraccia.Value);
                }

                if (startDate.HasValue)
                {
                    DateTime utcStartDate = startDate.Value.ToUniversalTime();
                    query = query.Where(x => x.DataOra >= utcStartDate);
                }

                if (endDate.HasValue)
                {
                    DateTime utcEndDate = endDate.Value.ToUniversalTime().AddDays(1).AddTicks(-1);
                    query = query.Where(x => x.DataOra <= utcEndDate);
                }

                var traces = await query.Take(numberOfRows).ToListAsync();

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

