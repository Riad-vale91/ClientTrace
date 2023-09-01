using Microsoft.AspNetCore.SignalR;
using ServerTrace.Models;
using ServerTrace.SignalR;

namespace ServerTrace.Hubs
{
    public class DashboardHub : Hub
    {
        DevTracerDbRepository devTracerDbRepository { get; set; }
        public DashboardHub(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DEVLOGConnectionString");
            devTracerDbRepository = new DevTracerDbRepository(connectionString);
        }

        public async Task SendDevTracer()
        {
            // var traceriList = devTracerDbRepository.GetDevTracerDb();
            var traceriList = new List<DEV_TracerDB>();
            await Clients.All.SendAsync("GetDevTracerDbHub", traceriList);
        }
    }
}
