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
    public class TypesController : ControllerBase
    {
        private readonly DEVLOGDbContext _context;
        public TypesController(DEVLOGDbContext context)
        {
            _context = context;
        }


        [HttpGet("traceTypes")]
        public async Task<IActionResult> GetTraceTypes()
        {
            try
            {
                var traceTypes = await _context.DEV_TipoTraccia.ToListAsync();

                return Ok(traceTypes);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex.Message);
            }
        }
    }
}