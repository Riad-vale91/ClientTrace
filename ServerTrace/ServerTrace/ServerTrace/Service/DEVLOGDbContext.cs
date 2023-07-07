using Microsoft.EntityFrameworkCore;
using ServerTrace.Models;
using System.Collections.Generic;


namespace ServerTrace.Service
{
    public class DEVLOGDbContext : DbContext
    {
        public DEVLOGDbContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<DEV_TracerDB> DEV_TracerDB { get; set; }
        public virtual DbSet<DEV_TipoTraccia> DEV_TipoTraccia { get; set; }
    }
}
