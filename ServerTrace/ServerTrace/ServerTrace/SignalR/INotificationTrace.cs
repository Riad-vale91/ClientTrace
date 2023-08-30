using ServerTrace.Models;

namespace ServerTrace.SignalR
{
    public interface INotificationTrace
    {
        ICollection<DEV_TracerDB> GetDevTraceDbNotification();
    }
}
