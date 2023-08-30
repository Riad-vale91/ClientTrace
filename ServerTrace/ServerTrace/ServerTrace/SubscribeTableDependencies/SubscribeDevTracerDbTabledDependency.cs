using ServerTrace.Hubs;
using ServerTrace.Models;
using TableDependency.SqlClient;

namespace ServerTrace.SubscribeTableDependencies
{
    public class SubscribeDevTracerDbTabledDependency : ISubscribeTableDependency
    {

        SqlTableDependency<DEV_TracerDB> tableDependency;
        DashboardHub dashboardHub;

        public SubscribeDevTracerDbTabledDependency(DashboardHub dashboardHub)
        {
            this.dashboardHub = dashboardHub;
        }

        public void SubscribeTableDependency(string connectionString)
        {
            tableDependency = new SqlTableDependency<DEV_TracerDB>(connectionString);
            tableDependency.OnChanged += TableDependency_OnChanged;
            tableDependency.OnError += TableDependency_OnError;
            tableDependency.Start();
        }

        private void TableDependency_OnChanged(object sender, TableDependency.SqlClient.Base.EventArgs.RecordChangedEventArgs<DEV_TracerDB> e)
        {
            if (e.ChangeType != TableDependency.SqlClient.Base.Enums.ChangeType.None)
            {
                dashboardHub.SendDevTracer();
            }
        }

        private void TableDependency_OnError(object sender, TableDependency.SqlClient.Base.EventArgs.ErrorEventArgs e)
        {
            Console.WriteLine($"{nameof(DEV_TracerDB)} SqlTableDependency error: {e.Error.Message}");
        }

    }
}
