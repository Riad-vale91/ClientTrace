﻿using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> GetTraces(int numberOfRows, long? IdTipoTraccia = null)
        {
            try
            {
                var query = _context.DEV_TracerDB.AsQueryable();

                if (IdTipoTraccia.HasValue)
                {
                    query = query.Where(x => x.IdTipoTraccia == IdTipoTraccia.Value);
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

        [HttpGet("traceTypes")]
        public async Task<IActionResult> GetTraceTypes()
        {
            try
            {
                var traceTypes = await _context.DEV_TipoTraccia.ToListAsync(); // Replace TraceTypes with your actual DbSet or data access method

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

